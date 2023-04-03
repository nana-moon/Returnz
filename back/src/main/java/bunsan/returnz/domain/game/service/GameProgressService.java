// package bunsan.returnz.domain.game.service;
//
// import java.time.LocalDate;
// import java.time.LocalDateTime;
// import java.util.HashMap;
// import java.util.List;
//
// import org.springframework.stereotype.Service;
//
// import bunsan.returnz.domain.game.dto.GameExchangeInterestDto;
// import bunsan.returnz.domain.game.dto.GameGamerStockDto;
// import bunsan.returnz.domain.game.dto.GameHistoricalPriceDayDto;
// import bunsan.returnz.domain.game.dto.GameRoomDto;
// import bunsan.returnz.domain.game.dto.GameStockDto;
// import bunsan.returnz.domain.game.enums.TurnPerTime;
// import bunsan.returnz.domain.member.service.MemberService;
// import bunsan.returnz.global.advice.exception.BusinessException;
// import lombok.AllArgsConstructor;
// import lombok.extern.slf4j.Slf4j;
//
// @Service
// @AllArgsConstructor
// @Slf4j
// public class GameProgressService {
// 	private final GameStockService gameStockService;
// 	private final GameRoomService gameRoomService;
// 	private final GameHistoricalPriceDayService gameHistoricalPriceDayService;
// 	private final GamerService gamerService;
// 	private final GamerStockService gamerStockService;
// 	private final GameCompanyDetailService gameCompanyDetailService;
// 	private final MemberService memberService;
// 	private final GameExchangeInterestService gameExchangeInterestService;
//
// 	/**
// 	 * Description : 턴이 시작할 때 필요한 정보를 반환한다.
// 	 * @param roomId : 게임방 uuid
// 	 * @param gamerId : 게이머 식별자
// 	 * @return : HashMap<String, Object> 형태로 반환
// 	 */
// 	public HashMap<String, Object> getTurnInformation(String roomId, Long gamerId) {
//
// 		GameRoomDto gameRoomDto = gameRoomService.findByRoomId(roomId);
// 		Long gameRoomId = gameRoomDto.getId();
// 		HashMap<String, Object> turnInformation = new HashMap<>();
// 		LocalDateTime curDate = gameRoomDto.getCurDate();
// 		turnInformation.put("turnEnd", false);
//
// 		if (gameRoomDto.getTotalTurn() <= gameRoomDto.getCurTurn()) {
// 			turnInformation.put("turnEnd", true);
// 			return turnInformation;
// 		}
//
// 		turnInformation.put("currentDate", gameRoomDto.getCurDate());
//
// 		// 환율, 금리, 유가 정보 - JPQL
// 		GameExchangeInterestDto gameExchangeInterestDto = getExchangeInterest(gameRoomDto.getCurDate());
// 		turnInformation.put("exchangeInterest", gameExchangeInterestDto);
//
// 		// 1. 날짜 별 그래프 데이터 - 게임 진행 주식 종목 가져오기
// 		List<GameStockDto> gameStockDtoList = gameStockService.findAllByGameRoomId(gameRoomId);
//
// 		// 1. 날짜 별 그래프 데이터 - 게임 진행 주식 종목을 바탕으로
// 		if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.MINUTE)) { // TODO : Current Null Return
// 			turnInformation.put("Stocks", getStockPriceMinute(gameStockDtoList, gameRoomDto));
// 		} else if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.DAY)) {
// 			turnInformation.put("Stocks", getStockPriceDay(gameStockDtoList, gameRoomDto, gameExchangeInterestDto));
// 		} else if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.WEEK)) { // TODO : Current Null Return
// 			turnInformation.put("Stocks", getStockPriceWeek(gameStockDtoList, gameRoomDto));
// 		} else if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.MONTH)) { // TODO : Current Null Return
// 			turnInformation.put("Stocks", getStockPriceMonth(gameStockDtoList, gameRoomDto));
// 		}
//
// 		// 2. id로 멤버 불러오기
// 		turnInformation.put("gamer", getAllGamer(gameRoomDto));
//
// 		// 3. 나의 현재 보유 종목
// 		List<GameGamerStockDto> gameGamerStockDtos = gamerStockService.findAllByGamer_Id(gamerId);
// 		turnInformation.put("gamerStock", gameGamerStockDtos);
//
// 		// 6. 주가 정보
// 		turnInformation.put("stockInformation", getStockPriceInformation(gameRoomDto.getCurDate(), gameStockDtoList));
//
// 		//  7. 첫턴일 떄만 종목 디테일 정보 제공
// 		if (gameRoomDto.getCurTurn() == 0) {
// 			turnInformation.put("companyDetail", getCompanyDetail(gameStockDtoList));
// 		}
//
// 		// 첫 턴이 아닐 경우 수행, 해당 유저의 평가자산 다음날 정보로 업데이트
// 		// if (gameRoomDto.getCurTurn() != 0) {
// 		//
// 		// }
//
// 		// 4. 다음 턴 정보 업데이트
// 		if (!updateTurnInformation(gameGamerStockDtos, roomId,
// 			gameRoomDto, gamerId)) {
// 			throw new BusinessException("다음 턴 정보를 얻어올 수 없습니다.");
// 		}
//
// 		return turnInformation;
// 	}
//
// 	/**
// 	 * Description : Parameter로 받은 날짜를 기반으로, 가장 가까운 날의 환율 정보를 제공한다.
// 	 * @param curDate : 환율 정보를 찾고자 하는 날짜
// 	 * @return : 환율, 한국 금리, 미국 금리
// 	 */
// 	public GameExchangeInterestDto getExchangeInterest(LocalDateTime curDate) {
// 		return gameExchangeInterestService.findAllByDateIsBeforeLimit1(LocalDate.from(curDate));
// 	}
//
// 	/**
// 	 * TODO : Minute
// 	 * @param gameRoomDto : 게임방, 게임 설정 정보를 담은 DTO
// 	 * @return : 작성 중
// 	 */
// 	public HashMap<String, List<GameHistoricalPriceDayDto>> getStockPriceMinute(List<GameStockDto> gameStockDtoList,
// 		GameRoomDto gameRoomDto) {
// 		return null;
// 	}
//
// 	/**
// 	 *
// 	 * @param gameStockDtoList : 현재 진행중인 게임의 종목 리스트
// 	 * @param gameRoomDto : 현재 진행중인 게임방 정보
// 	 * @param gameExchangeInterestDto : 환율, 금리 정보
// 	 * @return : 턴에 맞는 주가를 반환한다.
// 	 */
// 	public HashMap<String, List<GameHistoricalPriceDayDto>> getStockPriceDay(List<GameStockDto> gameStockDtoList,
// 		GameRoomDto gameRoomDto, GameExchangeInterestDto gameExchangeInterestDto) {
//
// 		HashMap<String, List<GameHistoricalPriceDayDto>> mapGameHistoricalPriceDayDto = new HashMap<>();
// 		// 첫 번째 턴인경우, 20 번 전 정보를 제공, HashMap에 저장
// 		if (gameRoomDto.getCurTurn() == 0) {
// 			for (int i = 0; i < gameStockDtoList.size(); ++i) {
//
// 				// 20 턴 전의 정보를 가져오기 위해서 CompanyCode 확인
// 				String companyCode = gameStockDtoList.get(i).getCompanyCode();
// 				// 20 턴 전의 정보를 현재 날짜와, CompanyCode를 통해서 가져오기
// 				List<GameHistoricalPriceDayDto> gameHistoricalPriceDayDtos =
// 					gameHistoricalPriceDayService.findAllByDateTimeIsBeforeWithCodeLimit20(
// 						gameRoomDto.getCurDate(), companyCode);
//
// 				// 문자열 길이 소수점 2자리 까지만으로 처리
// 				for (GameHistoricalPriceDayDto gameHistoricalPriceDayDto : gameHistoricalPriceDayDtos) {
// 					gameHistoricalPriceDayDto.setOpen(
// 						String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getOpen())));
// 					gameHistoricalPriceDayDto.setHigh(
// 						String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getHigh())));
// 					gameHistoricalPriceDayDto.setLow(
// 						String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getLow())));
// 					gameHistoricalPriceDayDto.setClose(
// 						String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getClose())));
// 					gameHistoricalPriceDayDto.setAdjclose(
// 						String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getAdjclose())));
// 				}
//
// 				// Key를 가지고 있지 않을 경우만
// 				if (!mapGameHistoricalPriceDayDto.containsKey(companyCode)) {
// 					mapGameHistoricalPriceDayDto.put(companyCode, gameHistoricalPriceDayDtos);
// 				}
// 			}
//
// 		} else { // 첫 번째 턴이 아닌 경우 하나만
// 			for (int i = 0; i < gameStockDtoList.size(); ++i) {
//
// 				// companyCode와 현재 날짜를 기반으로 데이터 가져오기
// 				String companyCode = gameStockDtoList.get(i).getCompanyCode();
// 				List<GameHistoricalPriceDayDto> gameHistoricalPriceDayDtos =
// 					gameHistoricalPriceDayService.findAllByDateTimeIsBeforeWithCodeLimit1(
// 						gameRoomDto.getCurDate(), companyCode);
//
// 				// 현재 날짜와 가져온 데이터가 일치하지 않을 경우
// 				if (!gameHistoricalPriceDayDtos.get(0).getDateTime().isEqual(gameRoomDto.getCurDate())) {
// 					gameHistoricalPriceDayDtos.get(0).setDateTime(gameRoomDto.getCurDate());
// 					gameHistoricalPriceDayDtos.get(0).setClose("0");
// 					gameHistoricalPriceDayDtos.get(0).setHigh("0");
// 					gameHistoricalPriceDayDtos.get(0).setOpen("0");
// 					gameHistoricalPriceDayDtos.get(0).setLow("0");
// 					gameHistoricalPriceDayDtos.get(0).setAdjclose("0");
// 					gameHistoricalPriceDayDtos.get(0).setDividends("0");
// 					gameHistoricalPriceDayDtos.get(0).setVolume("0");
// 				} else {
// 					for (GameHistoricalPriceDayDto gameHistoricalPriceDayDto : gameHistoricalPriceDayDtos) {
// 						gameHistoricalPriceDayDto.setOpen(
// 							String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getOpen())));
// 						gameHistoricalPriceDayDto.setHigh(
// 							String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getHigh())));
// 						gameHistoricalPriceDayDto.setLow(
// 							String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getLow())));
// 						gameHistoricalPriceDayDto.setClose(
// 							String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getClose())));
// 						gameHistoricalPriceDayDto.setAdjclose(
// 							String.format("%.2f", Double.parseDouble(gameHistoricalPriceDayDto.getAdjclose())));
// 					}
// 				}
// 				// Key를 가지고 있지 않을 경우만
// 				if (!mapGameHistoricalPriceDayDto.containsKey(companyCode)) {
// 					mapGameHistoricalPriceDayDto.put(companyCode, gameHistoricalPriceDayDtos);
// 				}
// 			}
// 		}
// 		return mapGameHistoricalPriceDayDto;
// 	}
//
// 	/**
// 	 * TODO : Week
// 	 * @param gameRoomDto : 게임방, 게임 설정 정보를 담은 DTO
// 	 * @return : 주별 주식 가격을 반환한다.
// 	 */
// 	public HashMap<String, List<GameHistoricalPriceDayDto>> getStockPriceWeek(List<GameStockDto> gameStockDtoList,
// 		GameRoomDto gameRoomDto) {
// 		return null;
// 	}
//
// 	/**
// 	 * TODO : Month
// 	 * @param gameRoomDto : 게임방, 게임 설정 정보를 담은 DTO
// 	 * @return : 월별 주식 가격을 반환한다.
// 	 */
// 	public HashMap<String, List<GameHistoricalPriceDayDto>> getStockPriceMonth(List<GameStockDto> gameStockDtoList,
// 		GameRoomDto gameRoomDto) {
// 		return null;
// 	}
// }
