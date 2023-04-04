package bunsan.returnz.domain.result.api;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.game.dto.GameGamerDto;
import bunsan.returnz.domain.game.dto.PurchaseSaleLogDto;
import bunsan.returnz.domain.game.service.GameRoomService;
import bunsan.returnz.domain.game.service.GamerService;
import bunsan.returnz.domain.member.service.MemberService;
import bunsan.returnz.domain.result.dto.GamerLogResponseDto;
import bunsan.returnz.domain.result.dto.ResultRequestBody;
import bunsan.returnz.domain.result.service.ResultService;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.persist.entity.GameRoom;
import bunsan.returnz.persist.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/results")
public class ResultController {

	private final ResultService resultService;
	private final GameRoomService gameRoomService;
	private final GamerService gamerService;
	private final MemberService memberService;

	@PostMapping("/result")
	public ResponseEntity<?> gameStart(@RequestBody ResultRequestBody resultRequestBody) {

		GameRoom gameRoom = gameRoomService.findById(resultRequestBody.getGameRoomId());
		if (!gameRoom.getCurTurn().equals(gameRoom.getTotalTurn())) {
			throw new BadRequestException("게임이 끝나지 않았습니다.");
		}

		// 모든 게이머 순서대로 찾기
		List<GameGamerDto> gameGamerDtos = resultService.findAllByGameRoomIdOrderByTotalProfitRate(gameRoom.getId());

		List<HashMap<String, Object>> responseInformation = new LinkedList<>();
		for (int i = 0; i < gameGamerDtos.size(); ++i) {
			HashMap<String, Object> gamerInformation = new HashMap<>();

			List<PurchaseSaleLogDto> purchaseSaleLogDtos
				= resultService.findAllByGameRoomIdAndMemberIdOrderById(
				resultRequestBody.getGameRoomId(), gameGamerDtos.get(i).getMermberId()
			);

			List<GamerLogResponseDto> gamerLogResponseDtos = resultService.findAllByMemberIdAndGameRoomId(
				gameGamerDtos.get(i).getMermberId(),
				resultRequestBody.getGameRoomId());
			Member member = memberService.findById(gameGamerDtos.get(i).getMermberId());

			gamerInformation.put("rank", (i + 1));
			gamerInformation.put("id", member.getId());
			gamerInformation.put("nickname", member.getNickname());
			gamerInformation.put("profile", member.getProfileIcon());
			gamerInformation.put("prev_avg_profit", gameGamerDtos.get(i).getTotalProfitRate());
			gamerInformation.put("trade_list", purchaseSaleLogDtos);
			gamerInformation.put("profits", gamerLogResponseDtos);
			responseInformation.add(gamerInformation);
		}

		return new ResponseEntity<>(responseInformation, HttpStatus.OK);

	}
}
