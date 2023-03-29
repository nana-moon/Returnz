package bunsan.returnz.domain.game.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.game.dto.GameRequestBody;
import bunsan.returnz.domain.game.dto.RequestSettingGame;
import bunsan.returnz.domain.game.enums.Theme;
import bunsan.returnz.domain.game.service.GameCompanyDetailService;
import bunsan.returnz.domain.game.service.GameHistoricalPriceDayService;
import bunsan.returnz.domain.game.service.GameRoomService;
import bunsan.returnz.domain.game.service.GameService;
import bunsan.returnz.domain.game.service.GameStartService;
import bunsan.returnz.domain.game.service.GameStockService;
import bunsan.returnz.domain.game.service.GamerService;
import bunsan.returnz.domain.game.service.GamerStockService;
import bunsan.returnz.global.advice.exception.BadRequestException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
// TODO: 2023-03-23  추후 시큐리티 설정
public class GameController {

	private final GameStartService gameStartService;
	private final GameStockService gameStockService;
	private final GameRoomService gameRoomService;
	private final GameHistoricalPriceDayService gameHistoricalPriceDayService;
	private final GamerService gamerService;
	private final GamerStockService gamerStockService;
	private final GameCompanyDetailService gameCompanyDetailService;
	private final GameService gameService;

	/**
	 * Description : 게임 턴이 진행될때 마다 필요한 정보를 출력
	 * ex) 0번 째 턴 -> 시작 화면 구성
	 * ex) X번 째 턴 -> 진행 정보 전달
	 *
	 * @param gameRequestBody
	 * @return
	 */
	@PostMapping("/game")
	public ResponseEntity<?> gameStart(@RequestBody GameRequestBody gameRequestBody) {

		// gameRequestBody null이면 에러 발생
		if (gameRequestBody == null || gameRequestBody.getRoomId() == null || gameRequestBody.getGamerId() == null) {
			throw new BadRequestException("잘못된 요청입니다.");
		}

		HashMap<String, Object> turnInformation = gameService.getTurnInformation(gameRequestBody.getRoomId(),
			gameRequestBody.getGamerId());
		if ((boolean)turnInformation.get("turnEnd")) {
			return new ResponseEntity<>("게임이 종료되었습니다.", HttpStatus.OK);
		}
		return new ResponseEntity<>(turnInformation, HttpStatus.OK);

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
	// 		GameRoomDto gameRoomDto = gameRoomService.findByRoomId(gameBuySellRequestBody.getRoomId());
	// 		double stockClosePrice = 0;
	// 		int amount = gameBuySellRequestBody.getAmoount();
	// 		if (gameRoomDto.getTurnPerTime().equals(TurnPerTime.DAY)) {
	// 			GameHistoricalPriceDayDto historicalPriceDayDto =
	// 				gameHistoricalPriceDayService.findByDateTimeAndCompanyCode(
	// 					gameRoomDto.getCurDate(),
	// 					companyCode);
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
	// 				Integer deposit = (int)(gameGamerDto.getDeposit() - stockClosePrice * amount);
	// 				if (deposit >= 0 && gamerService.updateDeposit(deposit)) {
	//
	// 					// Gamer Stock Entity 저장
	// 					GameGamerStockDto gameGamerStockDto =
	// 						gamerStockService.findByGamerIdAndCompanyCode(gamerId, companyCode);
	//
	// 					// 주식은 default로 모든 주식에 대해서 0개씩 가지고 있음
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
	// 	return null;
	// }

	@PostMapping("/init")
	public ResponseEntity settingGame(@RequestBody RequestSettingGame requestSettingGame) {
		if (!Theme.isValid(requestSettingGame.getTheme())) {
			throw new BadRequestException("테마가 잘못됬습니다");
		}
		//테마 가 유저면 턴당 정보, 총턴수 , 턴시작 을 알려줘야합니다. 아니면 애러 발생
		requestSettingGame.validateRequestSettingGame();
		if (!(requestSettingGame.getMemberIdList().size() > 0)) {
			throw new BadRequestException("유저는 최소 한명 이상이여야합니다.");
		}
		Map<String, Object> stringObjectMap = gameStartService.settingGame(requestSettingGame);
		// 태마 게임일경우
		return ResponseEntity.ok().body(stringObjectMap);
	}

}
