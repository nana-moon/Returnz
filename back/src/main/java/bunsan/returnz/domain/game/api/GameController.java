package bunsan.returnz.domain.game.api;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.game.dto.GameStockDto;
import bunsan.returnz.domain.game.dto.RequestSettingGame;
import bunsan.returnz.domain.game.enums.Theme;
import bunsan.returnz.domain.game.service.GameStockService;
import bunsan.returnz.global.advice.exception.BadRequestException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
// TODO: 2023-03-23  추후 시큐리티 설정
public class GameController {
	private final GameStockService gameStockService;

	/**
	 * Description : 게임 턴이 진행될때 마다 필요한 정보를 출력
	 * ex) 0번 째 턴 -> 시작 화면 구성
	 * ex) X번 째 턴 -> 진행 정보 전달
	 * @param roomId
	 * @return
	 */
	@PostMapping("/game")
	public ResponseEntity<?> gameStart(@RequestBody String roomId) {

		/**
		 * 필요한 데이터 목록
		 * 1. 날짜별 그래프 총 데이터 ( 환율 계산해서 그래프 데이터주세요 )
		 * 2. 주가정보는 턴 시간 상관없이 일단위로 (5일 전 까지)
		 * 3. 과거대비 과거등락도 계산해서 주고, 상태 (UP, DOWN, STAY)
		 * 4. 금리, 환율
		 * 5. 첫턴에 상장종목 셀트리온처럼 주세요
		 * 6. 두번째 턴 부턴 저번 턴 기준으로 대비 등락, 상태(UP, DOWN, SATY)까지
		 * 7. 친구 정보
		 * 8. 예수금 천만 총 매입금액 0 총 평가금액 0 평가손익 0 총 평가자산 천만
		 * 9. 턴 수도 줘요
		 */

		// 게임 진행 주식 종목 가져오기
		List<GameStockDto> gameStockDtoList = gameStockService.findAllBygameRoomId(roomId);

		return null;
	}

	@PostMapping("/init")
	public ResponseEntity settingGame(@RequestBody RequestSettingGame requestSettingGame) {
		// TODO: 2023-03-23 입력에 대한 검증..
		if (!Theme.isValid(requestSettingGame.getTheme())) {
			throw new BadRequestException("테마가 잘못됬습니다");
		}
		if (requestSettingGame.equals(Theme.USER.getTheme())) {
			if (requestSettingGame.getTotalTurn().equals(null)
				| requestSettingGame.getStartTime().equals(null) |
				requestSettingGame.getTernPerTime().equals(null)) {

			}
		}

		String roomId = "test";

		return ResponseEntity.ok().body(Map.of("romID", roomId));
	}
}
