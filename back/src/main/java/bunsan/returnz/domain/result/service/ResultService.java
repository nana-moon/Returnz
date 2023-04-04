package bunsan.returnz.domain.result.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameGamerDto;
import bunsan.returnz.domain.result.dto.GamerLogResponseDto;
import bunsan.returnz.domain.result.dto.PurchaseSaleLogResponseDto;
import bunsan.returnz.persist.entity.Gamer;
import bunsan.returnz.persist.entity.GamerLog;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.entity.PurchaseSaleLog;
import bunsan.returnz.persist.repository.GamerLogRepository;
import bunsan.returnz.persist.repository.GamerRepository;
import bunsan.returnz.persist.repository.MemberRepository;
import bunsan.returnz.persist.repository.PurchaseSaleLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ResultService {

	private final PurchaseSaleLogRepository purchaseSaleLogRepository;
	private final GamerLogRepository gamerLogRepository;
	private final GamerRepository gamerRepository;
	private final MemberRepository memberRepository;

	/**
	 *
	 * @param gameRoomId : 로그를 확인 할 방의 고유 번호
	 * @param memberId : 해당 방의 게이머의 아이디
	 * @return : 매수, 매도 로그를 List로 반환한다.
	 */
	public List<PurchaseSaleLogResponseDto> findAllByGameRoomIdAndMemberIdOrderById(Long gameRoomId, Long memberId) {

		List<PurchaseSaleLog> purchaseSaleLogs = purchaseSaleLogRepository.findAllByGameRoomIdAndMemberIdOrderById(
			gameRoomId,
			memberId);
		List<PurchaseSaleLogResponseDto> purchaseSaleLogResponseDtos = new LinkedList<>();

		for (PurchaseSaleLog purchaseSaleLog : purchaseSaleLogs) {
			PurchaseSaleLog log = new PurchaseSaleLog();
			purchaseSaleLogResponseDtos.add(log.toResponseDto(purchaseSaleLog));
		}

		return purchaseSaleLogResponseDtos;
	}

	/**
	 * Description : 결과 페이지 중 Gamer에 대한 정보를 얻기 위해 사용한다.
	 * @param memberId : 멤버 고유 아이디
	 * @param gameRoomId : 게임방 고유 아이디
	 * @return : 해당 게임방에 참가한 Gamer들의 정보를 List로 반환한다.
	 */
	public List<GamerLogResponseDto> findAllByMemberIdAndGameRoomId(Long memberId, Long gameRoomId) {
		List<GamerLog> gamerLogs = gamerLogRepository.findAllByMemberIdAndGameRoomId(memberId, gameRoomId);
		List<GamerLogResponseDto> gamerLogResponseDtos = new LinkedList<>();

		for (GamerLog gamerLog : gamerLogs) {
			GamerLog log = new GamerLog();
			gamerLogResponseDtos.add(log.toResponseDto(gamerLog));
		}

		return gamerLogResponseDtos;
	}

	/**
	 * Description : 결과 페이지에서 해당 유저의 rank를 얻기 위해서 사용한다.
	 * @param gameRoomId : 게임방 고유 아이디
	 * @return : Gamer를 total profit rate를 기준으로 정렬한다.
	 */
	public List<GameGamerDto> findAllByGameRoomIdOrderByTotalProfitRate(Long gameRoomId) {
		List<Gamer> gamers = gamerRepository.findAllByGameRoomIdOrderByTotalProfitRate(gameRoomId);

		List<GameGamerDto> gameGamerDtos = new LinkedList<>();
		for (Gamer gamer : gamers) {
			Gamer game = new Gamer();
			gameGamerDtos.add(game.toDto(gamer));
		}
		return gameGamerDtos;
	}
	// 유저의 평균 수익률 갱신
	public void updateAvgProfit(Member member, Double totalProfit) {
		Long gameReturn = Double.valueOf(totalProfit).longValue();
		member.addAccReturn(gameReturn);
		// 유저의 gameCount ++
		member.addGameCount();
		// 평균 수익률 갱신
		member.setAvgProfit();
		memberRepository.save(member);
	}

	public List<String> getNewProfile(Member member, int rank, Double totalProfit, int gameMemberCount) {

		// 유저의 연승 횟수 올리기
		if(gameMemberCount >= 2 && rank == 1) {
			member.addStreakCount();
			memberRepository.save(member);
		}
		//검증 로직 함수화
		// B(사자) 1판함
		// C(호랑이) 5판함
		// D(고양이) 첫1등
		// E(쥐) 꼴등
		// F(여우) 한판수익률10퍼
		// G(미어캣) 한판수익률30퍼
		// K(기린) 2연승-(1등 2번)
		return null;
	}
}
