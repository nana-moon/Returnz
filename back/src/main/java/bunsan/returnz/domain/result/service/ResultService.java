package bunsan.returnz.domain.result.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameGamerDto;
import bunsan.returnz.domain.game.dto.PurchaseSaleLogDto;
import bunsan.returnz.domain.result.dto.GamerLogResponseDto;
import bunsan.returnz.persist.entity.Gamer;
import bunsan.returnz.persist.entity.GamerLog;
import bunsan.returnz.persist.entity.PurchaseSaleLog;
import bunsan.returnz.persist.repository.GamerLogRepository;
import bunsan.returnz.persist.repository.GamerRepository;
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

	/**
	 *
	 * @param gameRoomId : 로그를 확인 할 방의 고유 번호
	 * @param memberId : 해당 방의 게이머의 아이디
	 * @return : 매수, 매도 로그를 List로 반환한다.
	 */
	public List<PurchaseSaleLogDto> findAllByGameRoomIdAndMemberIdOrderById(Long gameRoomId, Long memberId) {

		List<PurchaseSaleLog> purchaseSaleLogs = purchaseSaleLogRepository.findAllByGameRoomIdAndMemberIdOrderById(
			gameRoomId,
			memberId);
		List<PurchaseSaleLogDto> purchaseSaleLogDtos = new LinkedList<>();

		for (PurchaseSaleLog purchaseSaleLog : purchaseSaleLogs) {
			PurchaseSaleLog log = new PurchaseSaleLog();
			purchaseSaleLogDtos.add(log.toDto(purchaseSaleLog));
		}

		return purchaseSaleLogDtos;
	}

	public List<GamerLogResponseDto> findAllByMemberIdAndGameRoomId(Long memberId, Long gameRoomId) {
		List<GamerLog> gamerLogs = gamerLogRepository.findAllByMemberIdAndGameRoomId(memberId, gameRoomId);
		List<GamerLogResponseDto> gamerLogResponseDtos = new LinkedList<>();

		for (GamerLog gamerLog : gamerLogs) {
			GamerLog log = new GamerLog();
			gamerLogResponseDtos.add(log.toResponseDto(gamerLog));
		}

		return gamerLogResponseDtos;
	}

	public List<GameGamerDto> findAllByGameRoomIdOrderByTotalProfitRate(Long gameRoomId) {
		List<Gamer> gamers = gamerRepository.findAllByGameRoomIdOrderByTotalProfitRate(gameRoomId);

		List<GameGamerDto> gameGamerDtos = new LinkedList<>();
		for (Gamer gamer : gamers) {
			Gamer game = new Gamer();
			gameGamerDtos.add(game.toDto(gamer));
		}
		return gameGamerDtos;
	}
}
