package bunsan.returnz.domain.result.service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameGamerDto;
import bunsan.returnz.domain.member.enums.ProfileIcon;
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

import javax.transaction.Transactional;

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

	@Transactional
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

	@Transactional
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

	@Transactional
	public List<GameGamerDto> findAllByGameRoomIdOrderByTotalProfitRate(Long gameRoomId) {
		List<Gamer> gamers = gamerRepository.findAllByGameRoomIdOrderByTotalProfitRate(gameRoomId);

		List<GameGamerDto> gameGamerDtos = new LinkedList<>();
		for (Gamer gamer : gamers) {
			Gamer game = new Gamer();
			gameGamerDtos.add(game.toDto(gamer));
		}
		return gameGamerDtos;
	}


	@Transactional
	public void updateAvgProfit(Member member, Double totalProfit) {
		// 유저의 평균 수익률 갱신
		Long gameReturn = Double.valueOf(totalProfit).longValue();
		member.addAccReturn(gameReturn);
		// 유저의 gameCount ++
		member.addGameCount();
		// 평균 수익률 갱신
		member.setAvgProfit();
		memberRepository.save(member);
	}


	@Transactional
	public List<String> getNewProfile(Member member, int rank, Double totalProfit, int gameMemberCount) {
		List<String> newProfiles = new ArrayList<>();
		// 1등일 때
		if (gameMemberCount >= 2 && rank == 1) {
			// D(고양이) 첫 1등
			addNewProfile(member, ProfileIcon.FOUR.getCode(), newProfiles);
			// 연승 + 1
			member.addStreakCount();
		} else if (gameMemberCount != 1) {
			// 1등 아닐 때 (한명일 땐 0으로 돌아가면 안됨)
			member.setStreakCountZero();
		}
		// B(사자) 1판함 & C(호랑이) 5판함
		if (member.getGameCount() == 1) {
			addNewProfile(member, ProfileIcon.TWO.getCode(), newProfiles);
		} else if (member.getGameCount() == 5) {
			addNewProfile(member, ProfileIcon.THREE.getCode(), newProfiles);
		}

		// E(쥐) 꼴등
		if (gameMemberCount >= 4 && rank == gameMemberCount) {
			addNewProfile(member, ProfileIcon.FIVE.getCode(), newProfiles);
		}

		// F(여우) 한 판 수익률 10퍼
		if (totalProfit >= 10) {
			addNewProfile(member, ProfileIcon.SIX.getCode(), newProfiles);
			// G(미어캣) 한 판 수익률 30퍼
			if (totalProfit >= 30) {
				addNewProfile(member, ProfileIcon.SEVEN.getCode(), newProfiles);
			}
		}
		// K(기린) 2연승 - (1등 2번)
		if (member.getStreakCount() == 2) {
			addNewProfile(member, ProfileIcon.ELEVEN.getCode(), newProfiles);
		}
		memberRepository.save(member);
		return newProfiles;
	}


	@Transactional
	private void addNewProfile(Member member, String code, List<String> newProfiles) {
		if (!member.getPermittedProfiles().contains(code)) {
			newProfiles.add(member.addProfile(code));
		}
	}
}
