package bunsan.returnz.domain.game.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.game.dto.RequestGameCreate;

@RestController
@RequestMapping("api/games")
// TODO: 2023-03-23  추후 시큐리티 설정
public class MemberController {
	@PostMapping("/test")
	public ResponseEntity<?> gameStart(@RequestBody RequestGameCreate requestGameCreate) {
		// 랜덤 종목 뽑아오고 -> 기록
		// 유저 정보 초기화
		// 현재턴 0
		// 게임 시작 일자

		return null;
	}

}
