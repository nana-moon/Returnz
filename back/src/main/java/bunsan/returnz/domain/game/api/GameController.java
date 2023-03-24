package bunsan.returnz.domain.game.api;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.game.dto.GameGamerDto;
import bunsan.returnz.domain.game.dto.GameGamerStockDto;
import bunsan.returnz.domain.game.dto.GameHistoricalPriceDayDto;
import bunsan.returnz.domain.game.dto.GameRequestBody;
import bunsan.returnz.domain.game.dto.GameRoomDto;
import bunsan.returnz.domain.game.dto.GameStockDto;
import bunsan.returnz.domain.game.enums.TurnPerTime;
import bunsan.returnz.domain.game.service.GameCompanyDetailService;
import bunsan.returnz.domain.game.service.GameHistoricalPriceDayService;
import bunsan.returnz.domain.game.service.GameRoomService;
import bunsan.returnz.domain.game.service.GameStockService;
import bunsan.returnz.domain.game.service.GamerService;
import bunsan.returnz.domain.game.service.GamerStockService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
// TODO: 2023-03-23  추후 시큐리티 설정
public class GameController {

	private final GameStockService gameStockService;
	private final GameRoomService gameRoomService;
	private final GameHistoricalPriceDayService gameHistoricalPriceDayService;
	private final GamerService gamerService;
	private final GamerStockService gamerStockService;
	private final GameCompanyDetailService gameCompanyDetailService;

	/**
	 * Description : 게임 턴이 진행될때 마다 필요한 정보를 출력
	 * ex) 0번 째 턴 -> 시작 화면 구성
	 * ex) X번 째 턴 -> 진행 정보 전달
	 * @param gameRequestBody
	 * @return
	 */
	@PostMapping("/game")
	public ResponseEntity<?> gameStart(@RequestBody GameRequestBody gameRequestBody) {
		try {
			/**
			 * 필요한 데이터 목록
			 * 1. 날짜별 그래프 총 데이터 ( 환율 계산해서 그래프 데이터주세요 )
			 * 2. 주가정보는 턴 시간 상관없이 일단위로 (20턴 전 까지)
			 * 3. 과거대비 과거등락도 계산해서 주고, 상태 (UP, DOWN, STAY)
			 * 4. 금리, 환율
			 * 5. 첫턴에 상장종목 셀트리온처럼 주세요
			 * 6. 두번째 턴 부턴 저번 턴 기준으로 대비 등락, 상태(UP, DOWN, SATY)까지
			 * 7. 친구 정보
			 * 8. 예수금 천만 총 매입금액 0 총 평가금액 0 평가손익 0 총 평가자산 천만
			 * 9. 턴 수도 줘요
			 */

			System.out.println(gameRequestBody.getGamerId() + " " + gameRequestBody.getRoomId());

			String roomId = gameRequestBody.getRoomId();
			Long gamerId = gameRequestBody.getGamerId();

			// 날짜 데이터 구하기
			GameRoomDto gameRoomDto = gameRoomService.findByRoomId(roomId);
			System.out.println(gameRoomDto.toString());
			// TODO: gameRoomDto가 null이면 에러 발생

			// TODO: 게임 종료 처리
			// if(gameRoomDto.getTotalTurn() == gameRoomDto.getCurTurn()) {
			// 	return new ResponseEntity<>(responseBody, HttpStatus.OK);
			// }

			// 주가 데이터를 가지고 있는 HashMap
			HashMap<String, List<GameHistoricalPriceDayDto>> mapGameHistoricalPriceDayDto = new HashMap<>();
			// 멤버 데이터를 가지고 있는 HashMap
			HashMap<String, GameGamerDto> mapGameGamerDto = new HashMap<>();

			// 1. 날짜 별 그래프 데이터
			// 게임 진행 주식 종목 가져오기
			List<GameStockDto> gameStockDtoList = gameStockService.findAllByGameRoomId(roomId);

			// TODO: gameStockDtoList가 비어있으면 에러 발생
			// if (gameStockDtoList.isEmpty() || gameStockDtoList.size() == 0) {
			//
			// }

			// 첫 번째 턴인경우, 20 번 전 정보를 제공, HashMap에 저장
			if (gameRoomDto.getCurTurn() == 0) {
				if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.Day)) {
					for (int i = 0; i < gameStockDtoList.size(); ++i) {
						String companyCode = gameStockDtoList.get(i).getCompanyCode();
						List<GameHistoricalPriceDayDto> gameHistoricalPriceDayDtos = gameHistoricalPriceDayService.findAllByDateTimeIsBeforeWithCodeLimit20(
							gameRoomDto.getCurDate(), companyCode);

						// Key를 가지고 있지 않을 경우만
						if (!mapGameHistoricalPriceDayDto.containsKey(companyCode)) {
							mapGameHistoricalPriceDayDto.put(companyCode, gameHistoricalPriceDayDtos);
						}
					}
				}
				// TODO: Month, Minute 구현
				// else if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.Month)) {
				// } else if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.Minute)) {
				// }
			}
			// 첫 번째 턴이 아닌 경우 하나만
			else {
				if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.Day)) {
					for (int i = 0; i < gameStockDtoList.size(); ++i) {
						String companyCode = gameStockDtoList.get(i).getCompanyCode();
						List<GameHistoricalPriceDayDto> gameHistoricalPriceDayDtos = gameHistoricalPriceDayService.findAllByDateTimeIsBeforeWithCodeLimit1(
							gameRoomDto.getCurDate().plusDays(1), companyCode);

						// Key를 가지고 있지 않을 경우만
						if (!mapGameHistoricalPriceDayDto.containsKey(companyCode)) {
							mapGameHistoricalPriceDayDto.put(companyCode, gameHistoricalPriceDayDtos);
						}
					}
				}
				// TODO: Month, Minute 구현
				// else if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.Month)) {
				// } else if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.Minute)) {
				// }
			}

			// id로 멤버 불러오기
			List<GameGamerDto> gameGamerDtos = gamerService.findAllByGameRoomId(gameRoomDto.getId());
			for (int i = 0; i < gameGamerDtos.size(); ++i) {
				if (!mapGameGamerDto.containsKey(gameGamerDtos.get(i))) {
					mapGameGamerDto.put(gameGamerDtos.get(i).getUserName(), gameGamerDtos.get(i));
				}
			}

			// 나의 현재 보유 종목
			List<GameGamerStockDto> gameGamerStockDtos = gamerStockService.findAllByGamerId(gamerId);
			HashMap<String, List<GameGamerStockDto>> mapGameGamerStockDtos = new HashMap<>();
			mapGameGamerStockDtos.put("gamerStock", gameGamerStockDtos);

			HashMap<String, HashMap> responseBody = new HashMap<>();
			responseBody.put("Stocks", mapGameHistoricalPriceDayDto);
			responseBody.put("Gamer", mapGameGamerDto);
			responseBody.put("gamerStock", mapGameGamerStockDtos);

			// TODO: curdate + 1, cur_turn + 1
			// 게임방 정보 업데이트 후 넘겨줘야 함
			String companyCode = gameStockDtoList.get(0).getCompanyCode();
			LocalDateTime curTime = gameRoomDto.getCurDate();
			GameHistoricalPriceDayDto gameHistoricalPriceDayDto = gameHistoricalPriceDayService.findByDateTimeIsAfterWithCodeLimit1(
				curTime, companyCode);

			boolean success = gameRoomService.updateGameTurn(gameHistoricalPriceDayDto.getDateTime(), roomId);
			// TODO : if(!success) 시 Error 발생

			return new ResponseEntity<>(responseBody, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// @PostMapping("/buy-sell")
	// public ResponseEntity<?> gameStart(@RequestBody GameBuySellRequestBody gameBuySellRequestBody) {
	//
	// 	// TODO : gameBuySellRequest valid check
	//
	// 	// Stock buy method
	// 	if (gameBuySellRequestBody.getType().equals("BUY")) {
	//
	// 		Long gamerId = gameBuySellRequestBody.getGamerId();
	// 		String companyCode = gameBuySellRequestBody.getCompanyCode();
	// 		// 사용자의 자산확인
	// 		GameGamerDto gameGamerDto = gamerService.findById(gamerId);
	//
	// 		// stock 가격 확인
	// 		GameRoomDto gameRoomDto = gameRoomService.findByroomId(gameBuySellRequestBody.getRoomId());
	// 		double stockClosePrice = 0;
	// 		int amount = gameBuySellRequestBody.getAmoount();
	// 		if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.Day)) {
	// 			GameHistoricalPriceDayDto historicalPriceDayDto = gameHistoricalPriceDayService.findByDateTimeAndCompanyCode(
	// 				gameRoomDto.getCurDate(),
	// 				companyCode);
	// 			stockClosePrice = Double.parseDouble(historicalPriceDayDto.getClose());
	// 		}
	// 		// TODO : else hour, minute 구현 필요
	// 		// TODO : if (stockClosePRice == 0) => Stock Not Fount Exception
	//
	// 		// 살려는 종목이 해외 주식인지, 국내 주식인지
	// 		GameCompanyDetailDto gameCompanyDetailDto = gameCompanyDetailService.findByCompanyCode(companyCode);
	//
	// 		if (gameCompanyDetailDto.getCountryCode().equals("KR")) {
	// 			if (gameGamerDto.getDeposit() >= (stockClosePrice * amount)) {
	//
	// 				// depostit 차감
	// 				Integer deposit = gameGamerDto.getDeposit() - stockClosePrice * amount
	// 				if (deposit >= 0 && gamerService.updateDeposit(deposit)) {
	//
	// 					// Gamer Stock Entity 저장
	// 					GameGamerStockDto gameGamerStockDto = gamerStockService.findByGamerIdAndCompanyCode(gamerId, companyCode);
	//
	// 					// 새로 사는 경우
	// 					if (gameGamerStockDto == null) {
	//
	// 					} else {	// 이미 있는 경우
	//
	// 					}
	//
	// 					System.out.println("BUY 성공");
	// 					// TODO : sout => log or Response
	// 				}
	//
	// 				// Gamer Stock Entity update, 있으면 추가, 없으면 생성
	//
	// 			}
	// 			// TODO : else => 에치금이 부족해 종목을 살 수 없습니다. Exception
	//
	// 		}
	// 		// TODO: else if(gameCompanyDetailDto.getCountryCode().equals("US")) - 환율 적용 구현 필요
	//
	// 	} else if (gameBuySellRequestBody.getType().equals("SELL")) {
	//
	// 	}
	// 	// TODO : else 시 Error 발생
	//
	// }

}