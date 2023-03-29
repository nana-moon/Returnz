package bunsan.returnz.domain.game.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameSettings;
import bunsan.returnz.domain.game.util.calendarrange.CalDateRange;
import bunsan.returnz.domain.game.util.calendarrange.MonthRange;
import bunsan.returnz.domain.game.util.calendarrange.WeekRange;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.persist.entity.Company;
import bunsan.returnz.persist.entity.GameRoom;
import bunsan.returnz.persist.entity.GameStock;
import bunsan.returnz.persist.entity.Gamer;
import bunsan.returnz.persist.entity.GamerStock;
import bunsan.returnz.persist.entity.HistoricalPriceDay;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.repository.CompanyRepository;
import bunsan.returnz.persist.repository.GameRoomRepository;
import bunsan.returnz.persist.repository.GameStockRepository;
import bunsan.returnz.persist.repository.GamerRepository;
import bunsan.returnz.persist.repository.GamerStockRepository;
import bunsan.returnz.persist.repository.HistoricalPriceDayRepository;
import bunsan.returnz.persist.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class GameStartService {
	private final GamerRepository gamerRepository;
	private final GameRoomRepository gameRoomRepository;
	private final GameStockRepository gameStockRepository;
	private final GamerStockRepository gamerStockRepository;
	private final MemberRepository memberRepository;
	private final CompanyRepository companyRepository;
	private final HistoricalPriceDayRepository historicalPriceDayRepository;

	/**
	 * 게임 시작정 디비 세팅을 해주는 서비스 함수
	 * @param gameSettings
	 * @return
	 */
	@Transactional
	public Map<String, Object> settingGame(GameSettings gameSettings) {
		// 주식방 만들기
		gameSettings.setThemeTotalTurnTime();
		GameRoom newGameRoom = buildGameRoom(gameSettings);
		// 랜덤 주식 가져와서 할당하기
		Pageable pageable = PageRequest.of(0, 10);
		List<Company> companyList = buildCompanies(newGameRoom, pageable);
		List<String> gameStockIds = new ArrayList<>();
		// 아이디만 뽑아낸 리스트
		for (Company stock : companyList) {
			gameStockIds.add(stock.getCode());
		}
		if (gameSettings.getTheme().getTheme().equals("COVID")
			|| gameSettings.getTheme().getTheme().equals("DOTCOM")
			|| gameSettings.getTheme().getTheme().equals("RIEMANN")
		) {
			checkThemeRange(gameSettings, gameStockIds);
		}

		checkRangeValid(gameSettings, gameStockIds);
		List<Member> getMemberId = memberRepository.findAllById(gameSettings.getMemberIdList());
		if (getMemberId.size() == 0) {
			throw new BadRequestException("유효한 참가자 아이디가 아닙니다");
		}
		List<Gamer> gamers = new ArrayList<>();
		List<Map> gamersIdList = new ArrayList<>();
		buildGamerFromMember(newGameRoom, getMemberId, gamers, gamersIdList);
		// 게이머들이 소유한 주식 초기화
		buildGamerStock(companyList, gamers);

		Map<String, Object> gameRoomsRes = new HashMap<>();
		gameRoomsRes.put("roomId", newGameRoom.getRoomId());
		gameRoomsRes.put("id", newGameRoom.getId());
		gameRoomsRes.put("gamerList", gamersIdList);

		return gameRoomsRes;

	}

	/**
	 * 테마 검사
	 * 요청 받은 테마 구분해 실제 디비 데이터 검사진행
	 * 지정한 턴수 에 비해 데이터가 있는지 검사하는 함수
	 * @param gameSettings
	 * @param gameStockIds
	 */
	private void checkThemeRange(GameSettings gameSettings, List<String> gameStockIds) {
		if (gameSettings.getTurnPerTime().getTime().equals("WEEK")) {
			checkWeek(gameSettings, gameStockIds);
		}
		if (gameSettings.getTurnPerTime().getTime().equals("MONTH")) {
			checkMonthRange(gameSettings, gameStockIds);
		}
		if (gameSettings.getTurnPerTime().getTime().equals("DAY")) {
			checkDayRange(gameSettings, gameStockIds);
		}
	}

	/**
	 * 유저 모드 검사
	 * 요청 받은 유져 모드 의 설정 (총턴수 시작일) 보고 데이터가 있는지 검사진행
	 * @param gameSettings
	 * @param gameStockIds
	 */
	private void checkRangeValid(GameSettings gameSettings, List<String> gameStockIds) {
		if (gameSettings.getTheme().getTheme().equals("USER")) {
			// day 일때 데이터가 있는지 체크
			if (gameSettings.getTurnPerTime().getTime().equals("DAY")) {
				checkDayRange(gameSettings, gameStockIds);
			}
			// week 일때 테스트
			if (gameSettings.getTurnPerTime().getTime().equals("WEEK")) {
				checkWeek(gameSettings, gameStockIds);
			}
			// MONTH 일때 테스트
			if (gameSettings.getTurnPerTime().getTime().equals("MONTH")) {
				checkMonthRange(gameSettings, gameStockIds);
			}
		}
	}

	/**
	 * 달 단위 일때
	 * 총 턴수에 해당되는 데이터가 있는지 검사
	 * 안되면 BadRequestException("지정한 달 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
	 * @param gameSettings
	 * @param gameStockIds
	 */
	private void checkMonthRange(GameSettings gameSettings, List<String> gameStockIds) {
		List<MonthRange> monthRanges = CalDateRange.calculateMonthRanges(
			gameSettings.getStartDateTime(),
			gameSettings.getTotalTurn());
		for (MonthRange monthRange : monthRanges) {
			LocalDateTime monthStart = monthRange.getFirstDay();
			LocalDateTime monthEnd = monthRange.getLastDay();
			boolean checkDataInMonthTurn = historicalPriceDayRepository
				.existsAtLeastOneRecordForEachCompany(
					monthStart, monthEnd,
					gameStockIds, 10L);
			if (!checkDataInMonthTurn) {
				throw new BadRequestException("지정한 달 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
			}
		}
	}

	/**
	 * 일 별 단위일때
	 * 총 턴수에 해당되는 데이터가 있는지 검사
	 * 안되면 BadRequestException("지정한 일 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
	 * @param gameSettings
	 * @param gameStockIds
	 */
	private void checkDayRange(GameSettings gameSettings, List<String> gameStockIds) {
		Pageable pageable = PageRequest.of(0, gameSettings.getTotalTurn());
		List<HistoricalPriceDay> dayDataAfterStartDay = historicalPriceDayRepository.getDayDataAfterStartDay(
			gameSettings.getStartDateTime(), gameStockIds, pageable);
		Integer countInDB = dayDataAfterStartDay.size();
		if (!countInDB.equals(gameSettings.getTotalTurn())) {
			throw new BadRequestException("지정한 일 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
		}
	}

	/**
	 * 일단위 일때
	 * checkWeek 주단위를 보았을때 데이터가 없다면
	 * throw new BadRequestException("지정한 주 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
	 * @param gameSettings
	 * @param gameStockIds
	 */
	private void checkWeek(GameSettings gameSettings, List<String> gameStockIds) {
		List<WeekRange> weekRanges = CalDateRange.calculateWeekRanges(
			gameSettings.getStartDateTime(),
			gameSettings.getTotalTurn());
		for (WeekRange weekRange : weekRanges) {
			LocalDateTime weekFirstDay = weekRange.getWeekFirstDay();
			LocalDateTime endDay = weekRange.getWeekLastDay();

			boolean checkAllStockIsThereMoreThenInWeek = historicalPriceDayRepository
				.existsAtLeastOneRecordForEachCompany(
					weekFirstDay, endDay, gameStockIds, 10L);
			if (!checkAllStockIsThereMoreThenInWeek) {
				throw new BadRequestException("지정한 주 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
			}
		}
	}

	/**
	 * gameStock 데이터 INSERT
	 * @param companyList
	 * @param gamers
	 */
	private void buildGamerStock(List<Company> companyList, List<Gamer> gamers) {
		// 게이머가 가진 주식 할당하기
		// 게임 스톡을 만들면서 게이머를 할당해야한다
		// 게이머들순회해서 아이디 가져오고
		for (Gamer gamer : gamers) {
			for (Company company : companyList) {
				GamerStock gamerStock = GamerStock.builder().companyCode(company.getCode()).gamer(gamer).build();
				GamerStock save = gamerStockRepository.save(gamerStock);
			}
		}
	}

	/**
	 * 맴버 조회 해서 Gamer 데이터 INSERT
	 * @param newGameRoom
	 * @param getMemberId
	 * @param gamers
	 * @param gamersIdList
	 */
	private void buildGamerFromMember(GameRoom newGameRoom, List<Member> getMemberId, List<Gamer> gamers,
		List<Map> gamersIdList) {
		for (Member member : getMemberId) {
			Gamer gamer = Gamer.builder()
				.memberId(member.getId())
				.gameRoom(newGameRoom)
				.deposit(100000000)
				.userNickname(member.getNickname())
				.username(member.getUsername())
				.build();
			gamerRepository.save(gamer);
			gamers.add(gamer);
			Map<String, Object> userNameAndGameId = new HashMap<>();
			userNameAndGameId.put("userName", gamer.getUserNickname());
			userNameAndGameId.put("gamerId", gamer.getId());
			gamersIdList.add(userNameAndGameId);
		}
	}

	/**
	 * 랜덤 회사 가져와서
	 * Company 테이블 INSERT
	 * @param newGameRoom
	 * @param pageable
	 * @return
	 */
	private List<Company> buildCompanies(GameRoom newGameRoom, Pageable pageable) {
		Page<Company> randomCompaniesPage = companyRepository.findRandomCompanies(pageable);
		List<Company> companyList = randomCompaniesPage.getContent();
		for (Company company : companyList) {
			GameStock companyEntity = GameStock.builder()
				.companyName(company.getCompanyName())
				.companyCode(company.getCode())
				.gameRoom(newGameRoom)
				.build();
			gameStockRepository.save(companyEntity);
		}
		return companyList;
	}

	/**
	 * 설정을 받고 gameRoom table 에 할당
	 * @param gameSettings
	 * @return
	 */
	private GameRoom buildGameRoom(GameSettings gameSettings) {
		GameRoom newGameRoom = GameRoom.builder()
			.roomId(UUID.randomUUID().toString())
			.turnPerTime(gameSettings.getTurnPerTime())
			.theme(gameSettings.getTheme())
			.curDate(gameSettings.getStartDateTime())
			.totalTurn(gameSettings.getTotalTurn())
			.roomMemberCount(gameSettings.getMemberIdList().size())
			.build();
		GameRoom save = gameRoomRepository.save(newGameRoom);
		return save;
	}

}
