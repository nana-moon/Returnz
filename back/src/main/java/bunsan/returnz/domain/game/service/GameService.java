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
import bunsan.returnz.global.advice.exception.NotFoundException;
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
		turnInformation.put("gamerStock", gamerStockService.findAllByGamer_Id(gamerId));

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
		if (!updateTurnInformation(gameStockDtoList.get(0).getCompanyCode(), roomId,
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

			// companyCode에 대한 과거 주가 데이터 정보를 담을 List 생성
			List<GameStockPriceInformationDto> gameStockPriceInformationDtos = new ArrayList<>();

			// size가 6보다 이하일 경우 주가 정보를 정상적으로 찾을 수 없음
			if (gameHistoricalPriceDayDtos.size() != 6) {
				throw new NotFoundException(curDate + "부터 5일 전의 주가 정보를 찾을 수 없습니다.");
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
					// 주가 정보 List에 추가3
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
		LocalDateTime curTime = gameRoomDto.getCurDate();
		GameHistoricalPriceDayDto gameHistoricalPriceDayDto =
			gameHistoricalPriceDayService.findByDateTimeIsAfterWithCodeLimit1(
				curTime, gameGamerStockDtos.get(0).getCompanyCode());

		if (gameRoomDto.getCurTurn() == 0) {
			return gameRoomService.updateGameTurn(curTime, roomId);
		}

		// stockInformation.put("gamer", getAllGamer(gameRoomDto));
		// stockInformation.put("gamerStock", gamerStockService.findAllByGamer_Id(gamerId));

		// gamerStockService.findAllByGamer_Id(gamerId)로 얻어온 리스트들을 순회하면서
		// gameHistoricalPriceDayDto.getDateTime()에 해당하는 데이터를 가져온 후 갱신한다. (update)
		// 갱신 목록은 buy 메서드 참고
		// HashMap<String, GameGamerDto> gameGamerDtos = getAllGamer(gameRoomDto);
		// List<GameGamerStockDto> gameStockDtoList = gamerStockService.findAllByGamer_Id(gamerId);

		for (GameGamerStockDto gameGamerStockDto : gameGamerStockDtos) {
			Double stockPrice = getStockPrice(roomId, gameGamerStockDto.getCompanyCode());

			if (stockPrice != 0) {

			}
		}

		// 해당 데이터를 바탕으로 Gamer를 갱신한다. (update)

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
						memberService.getMemberbyId(gameGamerDtos.get(i).getMermberId()).getProfileIcon().getCode());
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
			= gameHistoricalPriceDayService.findByDateTimeAndCompanyCode(
			gameRoomDto.getCurDate(),
			companyCode);

		log.info(gameHistoricalPriceDayDto.toString());

		Double stockClosePrice = Double.parseDouble(
			String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getClose())));
		log.info("" + stockClosePrice);
		log.info(gameGamerDto.toString());
		if (stockClosePrice == 0) {
			throw new BadRequestException("해당 종목의 가격 정보가 없습니다.");
		}

		// deposit이 총 매수 금액 보다 크거나 같을 때 구매할 수 있다.
		if (gameGamerDto.getDeposit() >= (stockClosePrice * count)) {

			// if() 외국 주식 인 경우 환율 적용하기

			// 매수 요청 종목 불러오기
			log.info("========================");
			GameGamerStockDto gameGamerStockDto =
				gamerStockService.findByGamerIdAndCompanyCode(gamerId, companyCode);
			log.info(gameGamerStockDto.toString());
			log.info(gameGamerDto.toString());

			// 구매 가격
			Integer purchasePrice = (int)(stockClosePrice * count);

			// "gamer" Table update
			// gamer - depostit 차감
			Integer deposit = gameGamerDto.getDeposit() - purchasePrice;
			// gamer - totalPurchateAmount 증가
			Integer totalPurchateAmount = gameGamerDto.getTotalPurchaseAmount() + purchasePrice;
			// gamer - totalEvaluationAsset은 변동 없음, profitRate 변동 없음
			// gamer - totalEvaluationStock 증가
			Integer totalEvaluationStock = gameGamerDto.getTotalEvaluationStock() + purchasePrice;
			// gamerStock - totalCount 증가
			Integer totalCount = gameGamerStockDto.getTotalCount() + count;
			// gamerStock - totalAmount 증가
			Integer totalAmount = gameGamerStockDto.getTotalAmount() + purchasePrice;
			// gamerStock - averagePrice 변동
			Double averagePrice = (double)(totalAmount / totalCount);
			// gamerStock - valuation 변동
			Double valuation = (stockClosePrice * totalCount) - totalAmount;

			gameGamerDto.setDeposit(deposit);
			gameGamerDto.setTotalPurchaseAmount(totalPurchateAmount);
			gameGamerDto.setTotalEvaluationStock(totalEvaluationStock);
			gamerService.updateDto(gameGamerDto);

			gameGamerStockDto.setTotalCount(totalCount);
			gameGamerStockDto.setTotalAmount(totalAmount);
			gameGamerStockDto.setAveragePrice(averagePrice);
			gameGamerStockDto.setValuation(valuation);
			gamerStockService.updateDto(gameGamerStockDto);
			log.info(gameGamerStockDto.toString());
			log.info(gameGamerDto.toString());

			HashMap<String, Object> stockInformation = new HashMap<>();
			stockInformation.put("gamer", getAllGamer(gameRoomDto));
			stockInformation.put("gamerStock", gamerStockService.findAllByGamer_Id(gamerId));

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
