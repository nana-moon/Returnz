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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.game.dto.GameGamerDto;
import bunsan.returnz.domain.game.service.GameRoomService;
import bunsan.returnz.domain.game.service.GamerService;
import bunsan.returnz.domain.member.service.MemberService;
import bunsan.returnz.domain.result.dto.GamerLogResponseDto;
import bunsan.returnz.domain.result.dto.PurchaseSaleLogResponseDto;
import bunsan.returnz.domain.result.dto.ResultRequestBody;
import bunsan.returnz.domain.result.service.ResultService;
import bunsan.returnz.persist.entity.GameRoom;
import bunsan.returnz.persist.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
	RequestMethod.DELETE, RequestMethod.PATCH})
@RequestMapping("/api/results")
public class ResultController {

	private final ResultService resultService;
	private final GameRoomService gameRoomService;
	private final GamerService gamerService;
	private final MemberService memberService;

	@PostMapping
	public ResponseEntity<?> getGameResult(@RequestBody ResultRequestBody resultRequestBody) {

		log.info("============ getGameResult");
		GameRoom gameRoom = gameRoomService.findById(resultRequestBody.getGameRoomId());
		// 모든 게이머 순서대로 찾기
		List<GameGamerDto> gameGamerDtos = resultService.findAllByGameRoomIdOrderByTotalProfitRateDesc(
			gameRoom.getId());
		log.info(gameGamerDtos.toString());

		List<HashMap<String, Object>> responseInformation = new LinkedList<>();
		for (int i = 0; i < gameGamerDtos.size(); ++i) {
			HashMap<String, Object> gamerInformation = new HashMap<>();

			List<PurchaseSaleLogResponseDto> purchaseSaleLogResponseDtos
				= resultService.findAllByGameRoomIdAndMemberIdOrderById(
				resultRequestBody.getGameRoomId(), gameGamerDtos.get(i).getMemberId()
			);

			log.info(purchaseSaleLogResponseDtos.toString());
			log.info(gameGamerDtos.get(i).getMemberId() + " " + resultRequestBody.getGameRoomId());
			List<GamerLogResponseDto> gamerLogResponseDtos = resultService.findAllByMemberIdAndGameRoomId(
				gameGamerDtos.get(i).getMemberId(),
				resultRequestBody.getGameRoomId());
			Member member = memberService.findById(gameGamerDtos.get(i).getMemberId());

			log.info(gamerLogResponseDtos.toString());

			// 유저의 평균 수익률 갱신
			Double prevAvgProfit = gameGamerDtos.get(i).getTotalProfitRate();
			resultService.updateAvgProfit(member, prevAvgProfit);
			// 유저의 새로 해금된 프사 리턴
			Integer gameMemberCount = gameGamerDtos.size();
			List<String> newProfiles = resultService.getNewProfile(member, i + 1, prevAvgProfit, gameMemberCount);

			gamerInformation.put("rank", (i + 1));
			gamerInformation.put("id", member.getId());
			gamerInformation.put("nickname", member.getNickname());
			gamerInformation.put("profile", member.getProfileIcon());
			gamerInformation.put("prev_avg_profit", gameGamerDtos.get(i).getTotalProfitRate());
			gamerInformation.put("trade_list", purchaseSaleLogResponseDtos);
			gamerInformation.put("profits", gamerLogResponseDtos);
			gamerInformation.put("newProfiles", newProfiles);

			responseInformation.add(gamerInformation);
		}

		return new ResponseEntity<>(responseInformation, HttpStatus.OK);

	}
}
