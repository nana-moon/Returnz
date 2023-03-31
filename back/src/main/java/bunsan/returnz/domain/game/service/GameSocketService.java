package bunsan.returnz.domain.game.service;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.RoomMessageDto;
import bunsan.returnz.infra.redis.service.RedisPublisher;
import bunsan.returnz.persist.repository.RedisGameRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameSocketService {
	private final RedisPublisher redisPublisher;
	private final RedisGameRoomRepository redisGameRoomRepository;

	public void sendPublicMessage(RoomMessageDto gameRequest) {
		redisPublisher.publishGameRoom(redisGameRoomRepository.getTopic("game-room"), gameRequest);
	}

// 	public void sendTurnInfo(RoomMessageDto gameRequest) {
// 		redisPublisher.publishGameRoom(redisGameRoomRepository.getTopic("game-room"), gameRequest);
// 	}
//
// 	public void sendChatMessage(RoomMessageDto gameRequest) {
// 		redisPublisher.publishGameRoom(redisGameRoomRepository.getTopic("game-room"), gameRequest);
// 	}
}
