package bunsan.returnz.domain.game.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameHistoricalPriceDayDto;
import bunsan.returnz.domain.game.dto.GameSettings;
import bunsan.returnz.domain.game.dto.GameStockDto;
import bunsan.returnz.domain.game.enums.Theme;
import bunsan.returnz.domain.game.enums.TurnPerTime;
import bunsan.returnz.domain.game.service.readonly.GameInfoService;
import bunsan.returnz.domain.game.util.calendarrange.CalDateRange;
import bunsan.returnz.domain.game.util.calendarrange.MonthRange;
import bunsan.returnz.domain.game.util.calendarrange.WeekRange;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.persist.entity.Company;
import bunsan.returnz.persist.entity.CovidThemeCompany;
import bunsan.returnz.persist.entity.DotcomThemeCompany;
import bunsan.returnz.persist.entity.FinancialNews;
import bunsan.returnz.persist.entity.GameRoom;
import bunsan.returnz.persist.entity.GameStock;
import bunsan.returnz.persist.entity.Gamer;
import bunsan.returnz.persist.entity.GamerStock;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.entity.NewsGroup;
import bunsan.returnz.persist.entity.RiemannThemeCompany;
import bunsan.returnz.persist.repository.CompanyRepository;
import bunsan.returnz.persist.repository.CovidThemeCompanyRepository;
import bunsan.returnz.persist.repository.DotcomThemeCompanyRepository;
import bunsan.returnz.persist.repository.FinancialNewsRepository;
import bunsan.returnz.persist.repository.GameRoomRepository;
import bunsan.returnz.persist.repository.GameStockRepository;
import bunsan.returnz.persist.repository.GamerRepository;
import bunsan.returnz.persist.repository.GamerStockRepository;
import bunsan.returnz.persist.repository.HistoricalPriceDayRepository;
import bunsan.returnz.persist.repository.MemberRepository;
import bunsan.returnz.persist.repository.NewsGroupRepository;
import bunsan.returnz.persist.repository.RiemannThemeCompanyRepository;
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
	private final FinancialNewsRepository financialNewsRepository;
	private final GameInfoService gameInfoService;
	private final NewsGroupRepository newsGroupRepository;
	private final RiemannThemeCompanyRepository riemannThemeCompanyRepository;
	private final CovidThemeCompanyRepository covidThemeCompanyRepository;
	private final DotcomThemeCompanyRepository dotcomThemeCompanyRepository;

	private static final Integer DEFAULT_DEPOSIT = 10000000;
	private static final Integer DEFAULT_COMPANY_COUNT = 10;

	/**
	 * 게임 시작정 디비 세팅을 해주는 서비스 함수
	 *
	 * @param gameSettings 리퀘스트를 전달하는 DTO startDate 를 localdateTime 으로 하나 더추가
	 * @return
	 */
	@Transactional
	public Map<String, Object> settingGame(GameSettings gameSettings) {
		// 주식방 만들기
		gameSettings.setThemeTotalTurnTime();
		GameRoom newGameRoom = buildGameRoom(gameSettings);
		// 랜덤 주식 가져와서 할당하기
		gameSettings.setStartTime(gameSettings.convertThemeStartDateTime().toLocalDate());
		List<Company> companyList = buildCompanies(newGameRoom, gameSettings);
		List<String> gameStockIds = new ArrayList<>();
		// 아이디만 뽑아낸 리스트
		for (Company stock : companyList) {
			gameStockIds.add(stock.getCode());
		}
		if (!gameSettings.getTheme().getTheme().equals("USER")) {
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
	 *
	 * @param gameSettings 리퀘스트를 전달하는 DTO startDate 를 localdateTime 으로 하나 더추가
	 * @param gameStockIds 게임에 사용할 주식 아이디 리스트
	 */
	private void checkThemeRange(GameSettings gameSettings, List<String> gameStockIds) {
		if (gameSettings.getTurnPerTime().getTime().equals("WEEK")) {
			checkWeek(gameSettings, gameStockIds);
		} else if (gameSettings.getTurnPerTime().getTime().equals("MONTH")) {
			checkMonthRange(gameSettings, gameStockIds);
		} else if (gameSettings.getTurnPerTime().getTime().equals("DAY")) {
			checkDayRange(gameSettings, gameStockIds);
		}
	}

	/**
	 * 유저 모드 검사
	 * 요청 받은 유져 모드 의 설정 (총턴수 시작일) 보고 데이터가 있는지 검사진행
	 *
	 * @param gameSettings 리퀘스트를 전달하는 DTO startDate 를 localdateTime 으로 하나 더추가
	 * @param gameStockIds 게임에 사용할 주식 아이디 리스트
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
	 *
	 * @param gameSettings 리퀘스트를 전달하는 DTO startDate 를 localdateTime 으로 하나 더추가
	 * @param gameStockIds 게임에 사용할 주식 아이디 리스트
	 */
	private void checkMonthRange(GameSettings gameSettings, List<String> gameStockIds) {
		List<MonthRange> monthRanges = CalDateRange.calculateMonthRanges(gameSettings.getStartDateTime(),
			gameSettings.getTotalTurn());
		for (MonthRange monthRange : monthRanges) {
			LocalDateTime monthStart = monthRange.getFirstDay();
			LocalDateTime monthEnd = monthRange.getLastDay();
			boolean checkDataInMonthTurn = historicalPriceDayRepository.existsAtLeastOneRecordForEachCompany(monthStart,
				monthEnd, gameStockIds, 10L);
			if (!checkDataInMonthTurn) {
				throw new BadRequestException("지정한 달 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
			}
		}
	}

	/**
	 * 주 별 단위일때
	 * 총 턴수에 해당되는 데이터가 있는지 검사
	 * 안되면 BadRequestException("지정한 일 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
	 *
	 * @param gameSettings 리퀘스트를 전달하는 DTO startDate 를 localdateTime 으로 하나 더추가
	 * @param gameStockIds 게임에 사용할 주식 아이디 리스트
	 */
	public void checkDayRange(GameSettings gameSettings, List<String> gameStockIds) {
		Boolean startDayIsValid = historicalPriceDayRepository
			.getDayStock(gameSettings.getStartDateTime(), gameStockIds,
				(long)gameStockIds.size());
		if (!startDayIsValid) {
			throw new BadRequestException("요청한 날은 영업일이 아닙니다.");
		}
		Pageable pageable = PageRequest.of(0, gameSettings.getTotalTurn().intValue());
		List<LocalDateTime> dayDataAfterStartDay = historicalPriceDayRepository.getDayDataAfterStartDay(
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
	 *
	 * @param gameSettings 리퀘스트를 전달하는 DTO startDate 를 localdateTime 으로 하나 더추가
	 * @param gameStockIds 게임에 사용할 주식 아이디 리스트
	 */
	private void checkWeek(GameSettings gameSettings, List<String> gameStockIds) {
		List<WeekRange> weekRanges = CalDateRange.calculateWeekRanges(gameSettings.getStartDateTime(),
			gameSettings.getTotalTurn());
		for (WeekRange weekRange : weekRanges) {
			LocalDateTime weekFirstDay = weekRange.getWeekFirstDay();
			LocalDateTime endDay = weekRange.getWeekLastDay();

			boolean checkAllStockIsThereMoreThenInWeek =
				historicalPriceDayRepository.existsAtLeastOneRecordForEachCompany(
					weekFirstDay, endDay, gameStockIds, 10L);
			if (!checkAllStockIsThereMoreThenInWeek) {
				throw new BadRequestException("지정한 주 수에 비해 세팅한 턴에 맞는 데이터가 적습니다.");
			}
		}
	}

	/**
	 * gameStock 데이터 INSERT
	 *
	 * @param companyList 회사객체를 가지고 있는 리스트
	 * @param gamers      게이머 리스트
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
	 *
	 * @param newGameRoom  생성된 게임룸 엔티티
	 * @param getMemberId  입력받은 맴버 아이디를 조회하고 담고 있는 리스트
	 * @param gamers       만들어진 게이머 리스트
	 * @param gamersIdList 게임에 사용할 주식 아이디 리스트
	 */
	private void buildGamerFromMember(GameRoom newGameRoom, List<Member> getMemberId, List<Gamer> gamers,
		List<Map> gamersIdList) {
		for (Member member : getMemberId) {
			Gamer gamer = Gamer.builder()
				.memberId(member.getId())
				.gameRoom(newGameRoom)
				.deposit(DEFAULT_DEPOSIT)
				.originDeposit(DEFAULT_DEPOSIT)
				.totalEvaluationAsset(DEFAULT_DEPOSIT)
				.userNickname(member.getNickname())
				.username(member.getUsername())
				.build();
			gamerRepository.save(gamer);
			gamers.add(gamer);
			Map<String, Object> userNameAndGameId = new HashMap<>();
			userNameAndGameId.put("nickname", gamer.getUserNickname());
			userNameAndGameId.put("gamerId", gamer.getId());
			userNameAndGameId.put("username", member.getUsername());
			userNameAndGameId.put("profileIcon", member.getProfileIcon());
			gamersIdList.add(userNameAndGameId);
		}
	}

	/**
	 * 랜덤 회사 가져와서
	 * Company 테이블 INSERT
	 *
	 * @param newGameRoom
	 * @return
	 */
	@Transactional
	public List<Company> buildCompanies(GameRoom newGameRoom, GameSettings gameSettings) {
		Pageable pageable = PageRequest.of(0, DEFAULT_COMPANY_COUNT);
		if (gameSettings.getTheme().equals(Theme.COVID)) {
			List<String> companyCode =
				new ArrayList<>(Arrays.asList(
					"069960.KS",
					"023530.KS",
					"000880.KS",
					"005380.KS",
					"078930.KS",
					"006360.KS",
					"136490.KS",
					"003550.KS",
					"005940.KS",
					"024110.KS",
					"051910.KS",
					"NFLX",
					"089590.KS",
					"POOL",
					"033780.KS"
				));
			List<Company> content = companyRepository.goDemon(pageable, companyCode).getContent();
			// log.info("찾아오 기업 리스트 갯수" + content.size());
			for (Company company : content) {
				GameStock companyEntity = GameStock.builder()
					.companyName(company.getCompanyName())
					.companyCode(company.getCode())
					.gameRoom(newGameRoom)
					.build();
				gameStockRepository.save(companyEntity);
				;
			}
			return content;
		} else {
			Page<Company> randomCompaniesPage = getRandomCompaniesByTheme(gameSettings.getTheme(), pageable);
			for (Company company : randomCompaniesPage) {
				GameStock companyEntity = GameStock.builder()
					.companyName(company.getCompanyName())
					.companyCode(company.getCode())
					.gameRoom(newGameRoom)
					.build();
				gameStockRepository.save(companyEntity);
			}
			return randomCompaniesPage.getContent();
		}
	}

	private Page<Company> getRandomCompaniesByTheme(Theme theme, Pageable pageable) {
		switch (theme) {
			case COVID:
				List<String> companyIdList = covidThemeCompanyRepository.findRandomCompaniesId(pageable)
					.getContent();
				return companyRepository.findCompaniesByCodeList(companyIdList, pageable);

			case RIEMANN:
				List<String> rimanCompanyIdList = riemannThemeCompanyRepository.findRandomCompaniesId(pageable)
					.getContent();
				return companyRepository.findCompaniesByCodeList(rimanCompanyIdList, pageable);
			case DOTCOM:
				List<String> dotcomCompanyIdList = dotcomThemeCompanyRepository.findRandomCompaniesId(pageable)
					.getContent();
				return companyRepository.findCompaniesByCodeList(dotcomCompanyIdList, pageable);
			default:
				return companyRepository.findRandomCompanies(pageable);
		}
	}

	/**
	 * 설정을 받고 gameRoom table 에 할당
	 *
	 * @param gameSettings
	 * @return
	 */
	private GameRoom buildGameRoom(GameSettings gameSettings) {
		GameRoom newGameRoom = GameRoom.builder()
			.roomId(UUID.randomUUID().toString())
			.turnPerTime(gameSettings.setThemTurnPerTime())
			.theme(gameSettings.getTheme())
			.curDate(gameSettings.getStartDateTime())
			.totalTurn(gameSettings.getTotalTurn())
			.roomMemberCount(gameSettings.getMemberIdList().size())
			.build();
		GameRoom save = gameRoomRepository.save(newGameRoom);
		return save;
	}

	@Transactional
	public void setNewsList(GameSettings gameSettings, Long gameRoomId) {
		// 턴당 시간에 따라 달라진다.
		// log.info("gameRoomid " + gameRoomId);
		List<GameStockDto> gameRoomStockList = gameInfoService.getGameRoomStockList(gameRoomId);
		// log.info("찾아온 개임룸 스톡 디티오 : " + gameRoomStockList.size());
		List<String> stockIdList = new ArrayList<>();
		for (GameStockDto gameStockDto : gameRoomStockList) {
			stockIdList.add(gameStockDto.getCompanyCode());
		}

		Pageable pageable = PageRequest.of(0, gameSettings.getTotalTurn());
		LocalDateTime startDate = null;
		List<LocalDateTime> dateEndDate = null;
		LocalDateTime endDate = null;
		// 턴종류 따라서 다르게 가져와야함
		startDate = gameSettings.getStartDateTime();
		if (gameSettings.getTurnPerTime().equals(TurnPerTime.DAY)) {
			// 뉴스 찾을 찾아올 구간 확인
			dateEndDate = historicalPriceDayRepository.getDateEndDate(startDate, stockIdList,
					pageable)
				.getContent();
			endDate = dateEndDate.get(dateEndDate.size() - 1);
		} else if (gameSettings.getTurnPerTime().equals(TurnPerTime.MONTH)) {
			//엔드데이트를 어떻게 가져오냐.. 유틸 써서 넓게 가져오자
			List<MonthRange> monthRanges = CalDateRange.calculateMonthRanges(startDate, gameSettings.getTotalTurn());
			endDate = monthRanges.get(monthRanges.size() - 1).getLastDay();
		} else {
			if (!gameSettings.getTurnPerTime().equals(TurnPerTime.WEEK)) {
				throw new BadRequestException("잘못된 turn per time 입니다.");
			}
			List<WeekRange> weekRanges = CalDateRange.calculateWeekRanges(startDate, gameSettings.getTotalTurn());
			endDate = weekRanges.get(weekRanges.size() - 1).getWeekLastDay();
		}
		// 기간 안에 뉴스 검색
		List<Object[]> newsResults = financialNewsRepository.findAllByDateAndCompanyCodes(startDate, endDate,
			stockIdList);
		List<FinancialNews> newsList = new ArrayList<>();
		for (Object[] result : newsResults) {
			FinancialNews financialNews = (FinancialNews)result[1];
			newsList.add(financialNews);
			// log.info(financialNews.getKoName() + " : " + financialNews.getDate());
		}
		// 뉴스
		GameRoom gameRoom = gameRoomRepository.findById(gameRoomId)
			.orElseThrow(() -> new NullPointerException("뉴스를 할당할 게임방이 없습니다."));
		NewsGroup newGroup = NewsGroup.builder()
			.financialNews(newsList)
			.endTime(endDate)
			.startTime(startDate)
			.build();
		gameRoom.setNewsGroup(newGroup);
		gameRoomRepository.save(gameRoom);
		newsGroupRepository.save(newGroup);
	}

}
