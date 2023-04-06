package bunsan.returnz.domain.game.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.game.dto.GameBuySellRequestBody;
import bunsan.returnz.domain.game.dto.GameRequestBody;
import bunsan.returnz.domain.game.dto.GameSettings;
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
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
	RequestMethod.DELETE, RequestMethod.PATCH})
@Slf4j
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
	 * @param gameRequestBody : 게임 시작, 진행을 위해 전달해야하는 정보. (roomId, gamerId)
	 * @return : 게임 진행에 필요한 정보를 key : value 형태로 반환한다.
	 */
	@PostMapping("/game")
	public ResponseEntity<?> gameStart(@RequestBody GameRequestBody gameRequestBody) {

		// gameRequestBody null이면 에러 발생
		if (gameRequestBody == null || gameRequestBody.getRoomId() == null || gameRequestBody.getGamerId() == null) {
			throw new BadRequestException("잘못된 요청입니다.");
		}

		HashMap<String, Object> turnInformation = gameService.getTurnInformation(gameRequestBody.getRoomId(),
			gameRequestBody.getGamerId(), gameRequestBody.isCaptain());
		if ((boolean)turnInformation.get("turnEnd")) {
			return new ResponseEntity<>("게임이 종료되었습니다.", HttpStatus.OK);
		}
		return new ResponseEntity<>(turnInformation, HttpStatus.OK);

	}

	@PostMapping("/purchases")
	public ResponseEntity<?> purchasesRequest(@RequestBody GameBuySellRequestBody gameBuySellRequestBody) {
		return new ResponseEntity<>(gameService.buyStock(gameBuySellRequestBody), HttpStatus.OK);
	}

	@PostMapping("/sales")
	public ResponseEntity<?> salesRequest(@RequestBody GameBuySellRequestBody gameBuySellRequestBody) {
		return new ResponseEntity<>(gameService.sellStock(gameBuySellRequestBody), HttpStatus.OK);
	}

	@PostMapping("/init")
	public ResponseEntity<?> settingGame(@RequestBody RequestSettingGame requestSettingGame) {
		if (!Theme.isValid(requestSettingGame.getTheme())) {
			throw new BadRequestException("테마가 잘못됬습니다");
		}
		//테마 가 유저면 턴당 정보, 총턴수 , 턴시작 을 알려줘야합니다. 아니면 애러 발생
		requestSettingGame.validateRequestSettingGame();
		if (!(requestSettingGame.getMemberIdList().size() > 0)) {
			throw new BadRequestException("유저는 최소 한명 이상이여야합니다.");
		}

		GameSettings gameSettings = new GameSettings(requestSettingGame);
		log.info("after constructor gameSetting" + gameSettings.getStartTime());
		Map<String, Object> stringObjectMap = gameStartService.settingGame(gameSettings);
		stringObjectMap.put("totalTurn", gameSettings.getTotalTurn());

		//신문세팅
		gameStartService.setNewsList(gameSettings, (Long)stringObjectMap.get("id"));
		return ResponseEntity.ok().body(stringObjectMap);
	}

}
