package bunsan.returnz.domain.game.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameBuySellRequestBody;
import bunsan.returnz.domain.game.dto.GameCompanyDetailDto;
import bunsan.returnz.domain.game.dto.GameExchangeInterestDto;
import bunsan.returnz.domain.game.dto.GameGamerDto;
import bunsan.returnz.domain.game.dto.GameGamerStockDto;
import bunsan.returnz.domain.game.dto.GameHistoricalPriceDayDto;
import bunsan.returnz.domain.game.dto.GameRoomDto;
import bunsan.returnz.domain.game.dto.GameStockDto;
import bunsan.returnz.domain.game.enums.StockState;
import bunsan.returnz.domain.game.enums.TurnPerTime;
import bunsan.returnz.domain.member.service.MemberService;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.BusinessException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class GameService {

	private final GameStockService gameStockService;
	private final GameRoomService gameRoomService;
	private final GameHistoricalPriceDayService gameHistoricalPriceDayService;
	private final GamerService gamerService;
	private final GamerStockService gamerStockService;
	private final GameCompanyDetailService gameCompanyDetailService;
	private final MemberService memberService;
	private final GameExchangeInterestService gameExchangeInterestService;

	/**
	 * Description : 턴이 시작할 때 필요한 정보를 반환한다.
	 * @param roomId : 게임방 uuid
	 * @param gamerId : 게이머 식별자
	 * @return : HashMap<String, Object> 형태로 반환
	 */
	public HashMap<String, Object> getTurnInformation(String roomId, Long gamerId) {

		GameRoomDto gameRoomDto = gameRoomService.findByRoomId(roomId);
		Long gameRoomId = gameRoomDto.getId();
		HashMap<String, Object> turnInformation = new HashMap<>();
		turnInformation.put("turnEnd", false);

		if (gameRoomDto.getTotalTurn() <= gameRoomDto.getCurTurn()) {
			turnInformation.put("turnEnd", true);
			return turnInformation;
		}

		turnInformation.put("currentDate", gameRoomDto.getCurDate());

		// 환율, 금리, 유가 정보 - JPQL
		GameExchangeInterestDto gameExchangeInterestDto = getExchangeInterest(gameRoomDto.getCurDate());
		turnInformation.put("exchangeInterest", gameExchangeInterestDto);

		// 1. 날짜 별 그래프 데이터 - 게임 진행 주식 종목 가져오기
		List<GameStockDto> gameStockDtoList = gameStockService.findAllByGameRoomId(gameRoomId);

		// 1. 날짜 별 그래프 데이터 - 게임 진행 주식 종목을 바탕으로
		if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.MINUTE)) { // TODO : Current Null Return
			turnInformation.put("Stocks", getStockPriceMinute(gameStockDtoList, gameRoomDto));
		} else if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.DAY)) {
			turnInformation.put("Stocks", getStockPriceDay(gameStockDtoList, gameRoomDto, gameExchangeInterestDto));
		} else if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.WEEK)) { // TODO : Current Null Return
			turnInformation.put("Stocks", getStockPriceWeek(gameStockDtoList, gameRoomDto));
		} else if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.MONTH)) { // TODO : Current Null Return
			turnInformation.put("Stocks", getStockPriceMonth(gameStockDtoList, gameRoomDto));
		}

		// 2. id로 멤버 불러오기
		turnInformation.put("gamer", getAllGamer(gameRoomDto));

		// 3. 나의 현재 보유 종목
		List<GameGamerStockDto> gameGamerStockDtos = gamerStockService.findAllByGamer_Id(gamerId);
		turnInformation.put("gamerStock", gameGamerStockDtos);

		// 6. 주가 정보
		turnInformation.put("stockInformation", getStockPriceInformation(gameRoomDto.getCurDate(), gameStockDtoList));

		//  7. 첫턴일 떄만 종목 디테일 정보 제공
		if (gameRoomDto.getCurTurn() == 0) {
			turnInformation.put("companyDetail", getCompanyDetail(gameStockDtoList));
		}

		// 첫 턴이 아닐 경우 수행, 해당 유저의 평가자산 다음날 정보로 업데이트
		// if (gameRoomDto.getCurTurn() != 0) {
		//
		// }

		// 4. 다음 턴 정보 업데이트
		if (!updateTurnInformation(gameGamerStockDtos, roomId,
			gameRoomDto, gamerId)) {
			throw new BusinessException("다음 턴 정보를 얻어올 수 없습니다.");
		}

		return turnInformation;
	}

	public GameExchangeInterestDto getExchangeInterest(LocalDateTime curDate) {
		return gameExchangeInterestService.findAllByDateIsBeforeLimit1(LocalDate.from(curDate));
	}

	/**
	 * Description : companyCode list가 주어졌을 때 대해서 추가 정보를 반환한다.
	 * @param gameStockDtoList :  현재 게임 주식 종목 리스트
	 * @return : 현재 게임 주식 종목 리스트의 추가 정보를 반환한다.
	 */
	public HashMap<String, GameCompanyDetailDto> getCompanyDetail(List<GameStockDto> gameStockDtoList) {
		HashMap<String, GameCompanyDetailDto> mapGameComapnyDetailDto = new HashMap<>();

		for (int i = 0; i < gameStockDtoList.size(); ++i) {
			String companyCode = gameStockDtoList.get(i).getCompanyCode();
			mapGameComapnyDetailDto.put(companyCode, gameCompanyDetailService.findByCompanyCode(companyCode));
		}
		return mapGameComapnyDetailDto;
	}

	/**
	 * Description : 현재 시간을 기준으로 6일 전까지의 데이터가 있을 때 주가 정보를 생성한다.
	 * 종목 코드와 현재 날짜를 기준으로 과거 6개의 데이터가 없는 경우 NotFoundException을 발생시킨다.
	 * @param curDate : 현재 턴의 날짜
	 * @param gameStockDtoList : 현재 게임 주식 종목 리스트
	 * @return : 과거 주가 데이터를 반환한다.
	 */
	public HashMap<String, List<GameStockPriceInformationDto>> getStockPriceInformation(LocalDateTime curDate,
		List<GameStockDto> gameStockDtoList) {
		HashMap<String, List<GameStockPriceInformationDto>> mapGameStockPriceInformationDto = new HashMap<>();

		for (int i = 0; i < gameStockDtoList.size(); ++i) {

			String companyCode = gameStockDtoList.get(i).getCompanyCode();

			// companyCode에 대한 과거 6일 데이터
			List<GameHistoricalPriceDayDto> gameHistoricalPriceDayDtos =
				gameHistoricalPriceDayService.findAllByDateTimeIsBeforeWithCodeLimit6(curDate,
					companyCode);
			log.info(gameHistoricalPriceDayDtos.toString());

			// companyCode에 대한 과거 주가 데이터 정보를 담을 List 생성
			List<GameStockPriceInformationDto> gameStockPriceInformationDtos = new ArrayList<>();

			// size가 6보다 이하일 경우 주가 정보를 정상적으로 찾을 수 없음
			if (gameHistoricalPriceDayDtos.size() != 6) {
				throw new BadRequestException("주가 정보를 정상적으로 찾을 수 없습니다.");
				// gameStockPriceInformationDtos.add(GameStockPriceInformationDto.builder();
				// mapGameStockPriceInformationDto.put(companyCode,
				// 	gameStockPriceInformationDtos);
			} else {
				for (int x = gameHistoricalPriceDayDtos.size() - 2; x >= 0; --x) {
					// 주가 정보 생성
					GameStockPriceInformationDto gameStockPriceInformationDto = GameStockPriceInformationDto.builder()
						.historyDate(x + 1)
						.historyPrice(Double.parseDouble(
							String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDtos.get(x).getClose()))))
						.historyDiff(
							Double.parseDouble(
								String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDtos.get(x).getClose())))
								- Double.parseDouble(String.format("%.2f", Double.parseDouble(
								gameHistoricalPriceDayDtos.get(x + 1).getClose()))))
						.historyUpAndDown(
							Double.parseDouble(
								String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDtos.get(x).getClose())))
								- Double.parseDouble(String.format("%.2f", Double.parseDouble(
								gameHistoricalPriceDayDtos.get(x + 1).getClose()))) > 0
								? (Double.parseDouble(
								String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDtos.get(x).getClose())))
								- Double.parseDouble(String.format("%.2f", Double.parseDouble(
								gameHistoricalPriceDayDtos.get(x + 1).getClose()))) == 0 ? StockState.STAY :
								StockState.UP) :
								StockState.DOWN)
						.volume(Long.parseLong(gameHistoricalPriceDayDtos.get(x).getVolume()))
						.dateTime(gameHistoricalPriceDayDtos.get(x).getDateTime())
						.build();
					// 주가 정보 List에 추가
					gameStockPriceInformationDtos.add(gameStockPriceInformationDto);
				}
				// companyCode를 key로 list를 불러올 수 있게 설정
				mapGameStockPriceInformationDto.put(companyCode,
					gameStockPriceInformationDtos);
			}
		}
		// map 반환
		return mapGameStockPriceInformationDto;
	}

	/**
	 * Description : roomId에 해당하는 게임방의 정보를 다음 턴으로 update 한다.
	 * @param gameGamerStockDtos : 주식 종목 리스트
	 * @param roomId : 게임방 uuid
	 * @param gameRoomDto : 게임방, 게임 설정 정보를 담은 DTO
	 * @return : True / Fase : 정상적으로 코드가 실행되면 True를 반환한다.
	 */
	public boolean updateTurnInformation(List<GameGamerStockDto> gameGamerStockDtos, String roomId,
		GameRoomDto gameRoomDto, Long gamerId) {

		log.info("============================= updateTurnInformation");

		// 현재 방의 날짜
		LocalDateTime curTime = gameRoomDto.getCurDate();
		GameHistoricalPriceDayDto gameHistoricalPriceDayDtoBefore =
			gameHistoricalPriceDayService.findAllByDateTimeIsBeforeWithCodeLimit1(
				curTime, gameGamerStockDtos.get(0).getCompanyCode()).get(0);

		// 현재 방의 날짜를 기준으로 다음 영업일을 구한다.
		GameHistoricalPriceDayDto gameHistoricalPriceDayDto =
			gameHistoricalPriceDayService.findByDateTimeIsAfterWithCodeLimit1(
				curTime, gameGamerStockDtos.get(0).getCompanyCode());

		// 처음 턴일 경우, 정보 출력 후 현재 날짜를 다음 날짜로
		if (gameRoomDto.getCurTurn() == 0) {
			return gameRoomService.updateGameTurn(gameHistoricalPriceDayDto.getDateTime(), roomId);
		}

		// 처음턴이 아닐 경우 아래 수행

		// 게이머의 정보를 가져온다.
		GameGamerDto gameGamerDto = gamerService.findById(gamerId);
		// 해당 게이머의 최신 주식 정보들을 가져온다.
		List<GameGamerStockDto> gameGamerStockDtoList = gamerStockService.findAllByGamer_Id(gamerId);

		// 최신 주식 정보들을 다음턴 날짜에 맞게 변경한다.
		// "gamer_stock" Table의 정보를 변경한다.
		// totalCount, totalAmount, averagePrice는 바뀌지 않는다. (총 구매 보유 수, 총 구매 가격, 구매 평균 단가)
		// 평가손익 : 해당 주식 현재 총 가격 - 해당 주식 총 구매 가격
		// 수익률 : profitRate : (해당 주식 현재 총 가격 - 해당 주식 총 구매 가격) / (해당 주식 총 구매가격) * 100
		// 수익률 : profitRate : ((int)(Double.parseDouble(stockPriceDataBefoer.getClose())
		// 					* gameGamerStockDto.getTotalCount())) - (totalCount * averagePrice)
		// 					/ (totalCount * averagePrice) * 100
		Integer totalEvaluationStock = gameGamerDto.getTotalEvaluationStock();
		for (GameGamerStockDto gameGamerStockDto : gameGamerStockDtoList) {

			// 다음 턴 날짜에 매칭되는 주식 가격 정보를 가져온다.
			GameHistoricalPriceDayDto stockPriceData = gameHistoricalPriceDayService.findByDateTimeAndCompanyCode(
				gameHistoricalPriceDayDto.getDateTime(), gameGamerStockDto.getCompanyCode());
			// 전 날짜에 매칭되는 주식 가격 정보를 가져온다.
			// : 다음 턴 날짜에 매칭되는 주식 가격이 없을 경우를 위해서 가져온다.
			GameHistoricalPriceDayDto stockPriceDataBefoer
				= gameHistoricalPriceDayService.findByDateTimeIsBeforeWithCodeLimit1(
				gameHistoricalPriceDayDto.getDateTime(), gameGamerStockDto.getCompanyCode());

			Double stockClosePrice = 0.0;
			if (stockPriceData != null) {
				stockClosePrice = Double.parseDouble(
					String.format("%.2f", Double.parseDouble(stockPriceData.getClose())));
			}

			// 외국 주식인 경우 환율 적용
			if (stockPriceData.getMarket().equals("nasdaq")) {
				GameExchangeInterestDto gameExchangeInterestDto = getExchangeInterest(stockPriceData.getDateTime());
				stockClosePrice = Double.parseDouble(
					String.format("%.2f",
						Double.parseDouble(stockPriceData.getClose()) * gameExchangeInterestDto.getExchangeRate()));
			}

			// 다음 턴 날짜에 해당하는 주식 가격을 가져올 수 없을 경우, 전 영업일을 기준으로 계산한다.
			if (stockClosePrice == 0) {
				double totalPrice = (Double.parseDouble(stockPriceDataBefoer.getClose())
					* gameGamerStockDto.getTotalCount());
				totalEvaluationStock += (int)(totalPrice);
				// 평가 손익 계산
				Double valuation =
					totalPrice - (gameGamerStockDto.getAveragePrice() * gameGamerStockDto.getTotalCount());
				// 수익률 계산
				Double profitRate = 0.0;
				if (valuation != 0 && gameGamerStockDto.getAveragePrice() != 0
					&& gameGamerStockDto.getTotalCount() != 0) {
					profitRate =
						(valuation) / (gameGamerStockDto.getAveragePrice() * gameGamerStockDto.getTotalCount()) * 100;
				}
				// 해당 정보 반영
				gameGamerStockDto.setValuation(Double.parseDouble(String.format("%.2f", valuation)));
				gameGamerStockDto.setProfitRate(Double.parseDouble(String.format("%.2f", profitRate)));
			} else {
				double totalPrice = stockClosePrice * gameGamerStockDto.getTotalCount();
				// 총 주식 평가 자산을 계산한다.
				totalEvaluationStock += (int)(totalPrice);
				// 평가 손익 계산
				Double valuation =
					totalPrice - (gameGamerStockDto.getAveragePrice() * gameGamerStockDto.getTotalCount());
				// 수익률 계산
				Double profitRate = 0.0;
				if (valuation != 0 && gameGamerStockDto.getAveragePrice() != 0
					&& gameGamerStockDto.getTotalCount() != 0) {
					profitRate =
						(valuation) / (gameGamerStockDto.getAveragePrice() * gameGamerStockDto.getTotalCount()) * 100;
				}
				// 해당 정보 반영
				gameGamerStockDto.setValuation(Double.parseDouble(String.format("%.2f", valuation)));
				gameGamerStockDto.setProfitRate(Double.parseDouble(String.format("%.2f", profitRate)));
			}
			// "gamer_stock" Table update
			log.info(gameGamerStockDto.toString());
			gamerStockService.updateDto(gameGamerStockDto);
		}

		// 해당 데이터를 바탕으로 Gamer를 갱신한다. (update)
		// totalEvaluationStock : 총 주식 평가 금액
		// totalEvaluationAsset : 총 평가 금액 : totalEvaluationStock + deposit
		// profitRate : 수익률 : ((totalEvaluationAsset - originDeposit) / originDeposit) * 100
		Integer totalEvaluationAsset = gameGamerDto.getDeposit() + totalEvaluationStock;
		gameGamerDto.setTotalEvaluationStock(totalEvaluationStock);
		gameGamerDto.setTotalEvaluationAsset(totalEvaluationAsset);
		gameGamerDto.setTotalProfitRate(
			(double)(((totalEvaluationAsset - gameGamerDto.getOriginDeposit()) / gameGamerDto.getOriginDeposit())
				* 100));
		log.info(gameGamerDto.toString());
		gamerService.updateDto(gameGamerDto);

		return gameRoomService.updateGameTurn(gameHistoricalPriceDayDto.getDateTime(), roomId);
	}

	/**
	 * Description : 방에 해당하는 모든 게이머를 출력한다. 게이머 MemberId를 조회해서 프로필 아이콘을 가져온다.
	 * @param gameRoomDto : 게임 방 정보를 가지고 있는 Dto
	 * @return : 현재 방에 참여하고 있는 참여자의 정보를 반환한다.
	 */
	HashMap<String, GameGamerDto> getAllGamer(GameRoomDto gameRoomDto) {
		List<GameGamerDto> gameGamerDtos = gamerService.findAllByGameRoomId(gameRoomDto.getId());
		HashMap<String, GameGamerDto> mapGameGamerDto = new HashMap<>();

		for (int i = 0; i < gameGamerDtos.size(); ++i) {
			if (!mapGameGamerDto.containsKey(gameGamerDtos.get(i))) {
				// TODO : uerProfilePath 추가하기 (member에서 조회한 후 직접 input)
				gameGamerDtos.get(i)
					.setUserProfileIcon(
						memberService.getMemberbyId(gameGamerDtos.get(i).getMermberId()).getProfileIcon());
				mapGameGamerDto.put(gameGamerDtos.get(i).getUserName(), gameGamerDtos.get(i));
			}
		}
		return mapGameGamerDto;
	}

	/**
	 * TODO : Minute
	 * @param gameRoomDto : 게임방, 게임 설정 정보를 담은 DTO
	 * @return : 작성 중
	 */
	public HashMap<String, List<GameHistoricalPriceDayDto>> getStockPriceMinute(List<GameStockDto> gameStockDtoList,
		GameRoomDto gameRoomDto) {
		return null;
	}

	/**
	 *
	 * @param gameRoomDto : 게임방, 게임 설정 정보를 담은 DTO
	 * @return : 일별 주식 가격을 반환한다.
	 */
	public HashMap<String, List<GameHistoricalPriceDayDto>> getStockPriceDay(List<GameStockDto> gameStockDtoList,
		GameRoomDto gameRoomDto, GameExchangeInterestDto gameExchangeInterestDto) {

		HashMap<String, List<GameHistoricalPriceDayDto>> mapGameHistoricalPriceDayDto = new HashMap<>();
		// 첫 번째 턴인경우, 20 번 전 정보를 제공, HashMap에 저장
		if (gameRoomDto.getCurTurn() == 0) {
			for (int i = 0; i < gameStockDtoList.size(); ++i) {

				String companyCode = gameStockDtoList.get(i).getCompanyCode();
				List<GameHistoricalPriceDayDto> gameHistoricalPriceDayDtos =
					gameHistoricalPriceDayService.findAllByDateTimeIsBeforeWithCodeLimit20(
						gameRoomDto.getCurDate(), companyCode);

				// 문자열 길이 소수점 2자리 까지만으로 처리
				for (GameHistoricalPriceDayDto gameHistoricalPriceDayDto : gameHistoricalPriceDayDtos) {
					gameHistoricalPriceDayDto.setOpen(
						String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getOpen())));
					gameHistoricalPriceDayDto.setHigh(
						String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getHigh())));
					gameHistoricalPriceDayDto.setLow(
						String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getLow())));
					gameHistoricalPriceDayDto.setClose(
						String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getClose())));
					gameHistoricalPriceDayDto.setAdjclose(
						String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getAdjclose())));
				}

				// Key를 가지고 있지 않을 경우만
				if (!mapGameHistoricalPriceDayDto.containsKey(companyCode)) {
					mapGameHistoricalPriceDayDto.put(companyCode, gameHistoricalPriceDayDtos);
				}
			}

		} else { // 첫 번째 턴이 아닌 경우 하나만
			for (int i = 0; i < gameStockDtoList.size(); ++i) {
				String companyCode = gameStockDtoList.get(i).getCompanyCode();
				List<GameHistoricalPriceDayDto> gameHistoricalPriceDayDtos =
					gameHistoricalPriceDayService.findAllByDateTimeIsBeforeWithCodeLimit1(
						gameRoomDto.getCurDate(), companyCode);

				if (!gameHistoricalPriceDayDtos.get(0).getDateTime().isEqual(gameRoomDto.getCurDate())) {
					gameHistoricalPriceDayDtos.get(0).setDateTime(gameRoomDto.getCurDate());
					gameHistoricalPriceDayDtos.get(0).setClose("0");
					gameHistoricalPriceDayDtos.get(0).setHigh("0");
					gameHistoricalPriceDayDtos.get(0).setOpen("0");
					gameHistoricalPriceDayDtos.get(0).setLow("0");
					gameHistoricalPriceDayDtos.get(0).setAdjclose("0");
					gameHistoricalPriceDayDtos.get(0).setDividends("0");
					gameHistoricalPriceDayDtos.get(0).setVolume("0");
				} else {
					for (GameHistoricalPriceDayDto gameHistoricalPriceDayDto : gameHistoricalPriceDayDtos) {
						gameHistoricalPriceDayDto.setOpen(
							String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getOpen())));
						gameHistoricalPriceDayDto.setHigh(
							String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getHigh())));
						gameHistoricalPriceDayDto.setLow(
							String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getLow())));
						gameHistoricalPriceDayDto.setClose(
							String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getClose())));
						gameHistoricalPriceDayDto.setAdjclose(
							String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getAdjclose())));
					}
				}
				// Key를 가지고 있지 않을 경우만
				if (!mapGameHistoricalPriceDayDto.containsKey(companyCode)) {
					mapGameHistoricalPriceDayDto.put(companyCode, gameHistoricalPriceDayDtos);
				}
			}
		}
		return mapGameHistoricalPriceDayDto;
	}

	/**
	 * TODO : Week
	 * @param gameRoomDto : 게임방, 게임 설정 정보를 담은 DTO
	 * @return : 주별 주식 가격을 반환한다.
	 */
	public HashMap<String, List<GameHistoricalPriceDayDto>> getStockPriceWeek(List<GameStockDto> gameStockDtoList,
		GameRoomDto gameRoomDto) {
		return null;
	}

	/**
	 * TODO : Month
	 * @param gameRoomDto : 게임방, 게임 설정 정보를 담은 DTO
	 * @return : 월별 주식 가격을 반환한다.
	 */
	public HashMap<String, List<GameHistoricalPriceDayDto>> getStockPriceMonth(List<GameStockDto> gameStockDtoList,
		GameRoomDto gameRoomDto) {
		return null;
	}

	/**
	 * Description : 방 번호와 회사 코드를 입력받아 현재 턴에 맞는 주식 가격을 반환한다.
	 * 				주식 가격은 Day로만 받아온다.
	 * 				외국 회사인 경우에는 환율을 계산한 후 반환한다.
	 * @param roomId : 주식방 uuid
	 * @param companyCode : 종목코드
	 * @return : 해당 종목코드와 게임방의 턴을 확인해 해당 날짜의 가격을 가져온다.
	 */
	public Double getStockPrice(String roomId, String companyCode) {
		GameRoomDto gameRoomDto = gameRoomService.findByRoomId(roomId);

		log.info("==============================================2");
		GameHistoricalPriceDayDto gameHistoricalPriceDayDto
			= gameHistoricalPriceDayService.findByDateTimeAndCompanyCode(
			gameRoomDto.getCurDate(),
			companyCode);

		if (gameHistoricalPriceDayDto == null) {
			return 0.0;
		}

		Double stockClosePrice = Double.parseDouble(
			String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getClose())));
		GameCompanyDetailDto gameCompanyDetailDto = gameCompanyDetailService.findByCompanyCode(companyCode);
		// TODO : 환율 데이터 if (gameCompanyDetailDto.getCountryCode().equals("US"){ }

		return stockClosePrice;
	}

	/**
	 * Description : 주식 매수. (현재 작성 중)
	 * @param gameBuySellRequestBody : 요청 시 body, gamerId, 주문 수량 count, 종목코드 comapnyCode, 방 번호 roomId를 담고 있다.
	 * @return : 매수가 성공할 경우 True를 리턴한다. 이외에는 Error를 발생시킨다.
	 */
	@Transactional
	public HashMap<String, Object> buyStock(GameBuySellRequestBody gameBuySellRequestBody) {

		Long gamerId = gameBuySellRequestBody.getGamerId();
		Integer count = gameBuySellRequestBody.getCount();
		String companyCode = gameBuySellRequestBody.getCompanyCode();
		String roomId = gameBuySellRequestBody.getRoomId();

		// 사용자의 자산확인
		GameGamerDto gameGamerDto = gamerService.findById(gamerId);
		// stock 가격 확인
		GameRoomDto gameRoomDto = gameRoomService.findByRoomId(roomId);
		gameRoomDto = gameRoomService.findByRoomId(roomId);
		GameHistoricalPriceDayDto gameHistoricalPriceDayDto
			= gameHistoricalPriceDayService.findByDateTimeIsBeforeWithCodeLimit1(
			gameRoomDto.getCurDate(),
			companyCode);

		if (gameHistoricalPriceDayDto == null) {
			throw new BadRequestException("해당 종목의 가격 정보가 없습니다.");
		}

		Double stockClosePrice = Double.parseDouble(
			String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getClose())));

		// 외국 주식인 경우 환율 적용
		if (gameHistoricalPriceDayDto.getMarket().equals("nasdaq")) {
			GameExchangeInterestDto gameExchangeInterestDto = getExchangeInterest(gameRoomDto.getCurDate());
			stockClosePrice = Double.parseDouble(
				String.format("%.2f", stockClosePrice * gameExchangeInterestDto.getExchangeRate()));
		}

		if (stockClosePrice == 0) {
			throw new BadRequestException("해당 종목의 가격 정보가 없습니다.");
		}

		// deposit이 총 매수 금액 보다 크거나 같을 때 구매할 수 있다.
		if (gameGamerDto.getDeposit() >= (stockClosePrice * count)) {

			// 기존에 사용자가 가지고 있던 종목 리스트 불러오기
			GameGamerStockDto gameGamerStockDto =
				gamerStockService.findByGamerIdAndCompanyCode(gamerId, companyCode);

			// 구매 가격
			Integer purchasePrice = (int)(stockClosePrice * count);

			// "gamer_stock" Table update
			// 기존에 사용자가 사놨던 해당 주식 수에 현재 사는 주식 수 더하기 (totalCount) : 총 보유 주식 수
			// 기존에 사용자가 사놨던 해당 주식 가격에 현재 사는 주식 가격 더하기 (totalAmount) : 총 보유 주식의 가격
			// 기존에 사용자가 샀던 주식 가격과 현재 사는 주식 가격을 바탕으로 평균 단가 구하기 (averagePrice) : 평균 단가
			// 평가 손익, 손익 비율은 바뀌지 않음 -> 턴 정보가 끝날 때 변경
			Integer totalCount = gameGamerStockDto.getTotalCount() + count;
			Integer totalAmount = gameGamerStockDto.getTotalAmount() + purchasePrice;
			Double averagePrice = 0.0;
			if (totalAmount != 0 && totalCount != 0) {
				averagePrice = (double)(totalAmount / totalCount);
				averagePrice = Double.parseDouble(String.format("%.2f", averagePrice));
			}

			// "gamer" Table update
			// 기존에 사용자가 가지고 있던 deposit을 구매 가격 만큼 차감 (deposit)
			// 기존에 사용자가 샀던 주식 가격에 현재 사는 주식 가격 더하기 (totalPurchaseAmount)
			// 사용자의 총 주식 평가 금액 현재 사는 주식 가격 만큼 더하기 (totalEvaluationStock)
			// 총 평가 자산(totalEvaluationAsset)은 변동 없음
			Integer deposit = gameGamerDto.getDeposit() - purchasePrice;
			Integer totalPurchateAmount = gameGamerDto.getTotalPurchaseAmount() + purchasePrice;
			Integer totalEvaluationStock = gameGamerDto.getTotalEvaluationStock() + purchasePrice;

			gameGamerDto.setDeposit(deposit);
			gameGamerDto.setTotalPurchaseAmount(totalPurchateAmount);
			gameGamerDto.setTotalEvaluationStock(totalEvaluationStock);
			gamerService.updateDto(gameGamerDto);

			gameGamerStockDto.setTotalCount(totalCount);
			gameGamerStockDto.setTotalAmount(totalAmount);
			gameGamerStockDto.setAveragePrice(averagePrice);

			// logo, companyName 추가
			GameCompanyDetailDto gameCompanyDetailDto = gameCompanyDetailService.findByCompanyCode(companyCode);
			gamerStockService.updateDto(gameGamerStockDto);
			gameGamerStockDto.setLogo(gameCompanyDetailDto.getLogo());
			gameGamerStockDto.setCompanyName(gameCompanyDetailDto.getKoName());

			HashMap<String, Object> stockInformation = new HashMap<>();
			stockInformation.put("gamer", gameGamerDto);
			stockInformation.put("gamerStock", gameGamerStockDto);

			return stockInformation;

		} else {
			throw new BadRequestException("예치금이 충분하지 않습니다.");
		}
	}

	/**
	 * Description : 주식을 매도 한다.
	 * @param gameBuySellRequestBody : 필요한 데이터
	 * @return : 주식을 매도한 결과를 리턴한다.
	 */
	@Transactional
	public HashMap<String, Object> sellStock(GameBuySellRequestBody gameBuySellRequestBody) {

		Long gamerId = gameBuySellRequestBody.getGamerId();
		Integer count = gameBuySellRequestBody.getCount();
		String companyCode = gameBuySellRequestBody.getCompanyCode();
		String roomId = gameBuySellRequestBody.getRoomId();

		// 사용자의 자산확인
		GameGamerDto gameGamerDto = gamerService.findById(gamerId);
		// stock 가격 확인
		GameRoomDto gameRoomDto = gameRoomService.findByRoomId(roomId);
		gameRoomDto = gameRoomService.findByRoomId(roomId);
		GameHistoricalPriceDayDto gameHistoricalPriceDayDto
			= gameHistoricalPriceDayService.findByDateTimeIsBeforeWithCodeLimit1(
			gameRoomDto.getCurDate(),
			companyCode);

		if (gameHistoricalPriceDayDto == null) {
			throw new BadRequestException("해당 종목의 가격 정보가 없습니다.");
		}

		Double stockClosePrice = Double.parseDouble(
			String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getClose())));

		// 외국 주식인 경우 환율 적용
		if (gameHistoricalPriceDayDto.getMarket().equals("nasdaq")) {
			GameExchangeInterestDto gameExchangeInterestDto = getExchangeInterest(gameRoomDto.getCurDate());
			stockClosePrice = Double.parseDouble(
				String.format("%.2f", stockClosePrice * gameExchangeInterestDto.getExchangeRate()));
		}

		if (stockClosePrice == 0) {
			throw new BadRequestException("해당 종목의 가격 정보가 없습니다.");
		}

		log.info(gameHistoricalPriceDayDto.toString());

		// 기존에 사용자가 가지고 있던 종목 리스트 불러오기
		GameGamerStockDto gameGamerStockDto =
			gamerStockService.findByGamerIdAndCompanyCode(gamerId, companyCode);

		// 보유한 종목 수가 매도할 종목 수 보다 많아야 가능하다.
		if (gameGamerStockDto.getTotalCount() >= (stockClosePrice * count)) {

			// 구매 가격
			Integer salesPrice = (int)(stockClosePrice * count);

			// "gamer_stock" Table update
			// 기존에 사용자가 사놨던 해당 주식 수에 현재 파는 주식 수 빼기 (totalCount) : 총 보유 주식 수
			// 기존에 사용자가 사놨던 해당 주식 가격에 현재 사는 주식 가격 빼기 (totalAmount) : 총 보유 주식의 가격
			// 평균 단가 : 변경 없음
			// 평가 손익 변경(valuation), 손익 비율은 바뀌지 않음 -> 턴 정보가 끝날 때 변경
			Integer totalCount = gameGamerStockDto.getTotalCount() - count;
			Integer totalAmount =
				gameGamerStockDto.getTotalAmount() - (int)(gameGamerStockDto.getAveragePrice() * count);

			// "gamer" Table update
			// 기존에 사용자가 가지고 있던 deposit을 판매 가격 만큼 증감 (deposit)
			// 기존에 사용자가 샀던 주식 가격에 현재 파는 주식의 평단 가격으로 계산한(avaeragePrice * count) 만큼 빼기 (totalPurchaseAmount)
			// 사용자의 총 주식 평가 금액 현재 사는 주식의 평단 가격으로 계산한 가격 만큼 빼기 (totalEvaluationStock)
			// 총 평가 자산(totalEvaluationAsset)은 변동 없음
			Integer deposit = gameGamerDto.getDeposit() + salesPrice;
			Integer totalPurchateAmount =
				gameGamerDto.getTotalPurchaseAmount() - (int)(gameGamerStockDto.getAveragePrice() * count);
			Integer totalEvaluationStock =
				gameGamerDto.getTotalEvaluationStock() + (int)(gameGamerStockDto.getAveragePrice() * count);

			gameGamerDto.setDeposit(deposit);
			gameGamerDto.setTotalPurchaseAmount(totalPurchateAmount);
			gameGamerDto.setTotalEvaluationStock(totalEvaluationStock);
			gamerService.updateDto(gameGamerDto);

			gameGamerStockDto.setTotalCount(totalCount);
			gameGamerStockDto.setTotalAmount(totalAmount);

			// logo, companyName 추가
			GameCompanyDetailDto gameCompanyDetailDto = gameCompanyDetailService.findByCompanyCode(companyCode);
			gamerStockService.updateDto(gameGamerStockDto);
			gameGamerStockDto.setLogo(gameCompanyDetailDto.getLogo());
			gameGamerStockDto.setCompanyName(gameCompanyDetailDto.getKoName());

			HashMap<String, Object> stockInformation = new HashMap<>();
			stockInformation.put("gamer", gameGamerDto);
			stockInformation.put("gamerStock", gameGamerStockDto);

			return stockInformation;

		} else {
			throw new BadRequestException("예치금이 충분하지 않습니다.");
		}

	}

	/**
	 * Description : totalCount, totalAmount가 업데이트 될 경우 호출된다.
	 *				totalCount, totalAmount를 이용하여 averagePrice, valuation, profitRate를 계산한다.
	 * @param gamerId : 게이머 아이디
	 * @param companyCode : 회상 종목 코드
	 * @return : 업데이트 결과 반환. True/False
	 */
	public List<GameGamerStockDto> setGamerStock(Long gamerId, String companyCode) {

		GameGamerDto gameGamerDto = gamerService.findById(gamerId);

		GameGamerStockDto gameGamerStockDto =
			gamerStockService.findByGamerIdAndCompanyCode(gamerId, companyCode);

		// gameGamerStockDto.setAveragePrice();

		return null;
	}

}
