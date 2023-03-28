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

import bunsan.returnz.domain.game.dto.RequestSettingGame;
import bunsan.returnz.domain.game.util.calendar_range.CalDateRange;
import bunsan.returnz.domain.game.util.calendar_range.MonthRange;
import bunsan.returnz.domain.game.util.calendar_range.WeekRange;
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

	@Transactional
	public Map<String, Object> settingGame(RequestSettingGame requestSettingGame) {
		// 주식방 만들기
		GameRoom newGameRoom = buildGameRoom(requestSettingGame);
		// 랜덤 주식 가져와서 할당하기
		Pageable pageable = PageRequest.of(0, 10);
		List<Company> companyList = buildCompanies(newGameRoom, pageable);
		checkRangeValid(requestSettingGame, companyList);


		// 맴버 가져와서 주식방 게이머 에 할당하기
		List<Member> getMemberId = memberRepository.findAllById(requestSettingGame.getMemberIdList());
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

	private void checkRangeValid(RequestSettingGame requestSettingGame, List<Company> gameStock) {

		if (requestSettingGame.getTheme().getTheme().equals("USER")) {
			List<String> gameStockIds = new ArrayList<>();
			for (Company stock : gameStock) {
				gameStockIds.add(stock.getCode());
			}
			// day 일때 데이터가 있는지 체크
			if (requestSettingGame.getTurnPerTime().getTime().equals("DAY")) {
				Pageable pageable = PageRequest.of(0, requestSettingGame.getTotalTurn());
				List<HistoricalPriceDay> dayDataAfterStartDay = historicalPriceDayRepository.getDayDataAfterStartDay(
					requestSettingGame.getStartTime(), gameStockIds, pageable);
				Integer countInDB = dayDataAfterStartDay.size();
				if (!countInDB.equals(requestSettingGame.getTotalTurn())) {
					throw new BadRequestException("지정한 일 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
				}
			}
			// week 일때 테스트
			if (requestSettingGame.getTurnPerTime().getTime().equals("WEEK")) {
				List<WeekRange> weekRanges = CalDateRange.calculateWeekRanges(requestSettingGame.getStartTime(),
					requestSettingGame.getTotalTurn());
				for (WeekRange weekRange : weekRanges) {
					LocalDateTime weekFirstDay = weekRange.getWeekFirstDay();
					LocalDateTime endDay = weekRange.getWeekLastDay();

					boolean checkAllStockIsThereMoreThenInWeek = historicalPriceDayRepository.existsAtLeastOneRecordForEachCompany(
						weekFirstDay, endDay, gameStockIds, 10L);
					if (!checkAllStockIsThereMoreThenInWeek) {
						throw new BadRequestException("지정한 주 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
					}
				}
			}
			// MONTH 일때 테스트
			if (requestSettingGame.getTurnPerTime().getTime().equals("MONTH")) {
				List<MonthRange> monthRanges = CalDateRange.calculateMonthRanges(requestSettingGame.getStartTime(),
					requestSettingGame.getTotalTurn());
				for (MonthRange monthRange : monthRanges) {
					LocalDateTime monthStart = monthRange.getFirstDay();
					LocalDateTime monthEnd = monthRange.getLastDay();
					boolean checkDataInMonthTurn = historicalPriceDayRepository.existsAtLeastOneRecordForEachCompany(monthStart, monthEnd,
						gameStockIds, 10L);
					if(!checkDataInMonthTurn){
						throw new BadRequestException("지정한 달 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
					}
				}
			}
		}
	}

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

	private GameRoom buildGameRoom(RequestSettingGame requestSettingGame) {
		GameRoom newGameRoom = GameRoom.builder()
			.roomId(UUID.randomUUID().toString())
			.turnPerTime(requestSettingGame.getTurnPerTime())
			.theme(requestSettingGame.getTheme())
			.curDate(requestSettingGame.getThemeStartTime())
			.totalTurn(requestSettingGame.getTotalTurn())
			.roomMemberCount(requestSettingGame.getMemberIdList().size())
			.build();
		gameRoomRepository.save(newGameRoom);
		return newGameRoom;
	}

}
