package bunsan.returnz.domain.game.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameRoomDto;
import bunsan.returnz.persist.entity.GameRoom;
import bunsan.returnz.persist.repository.GameRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameRoomService {

	private final GameRoomRepository gameRoomRepository;

	public GameRoomDto findById(String roomId) {
		Optional<GameRoom> optionalGameRoom = gameRoomRepository.findByroomId(roomId);
		// TODO: gameRoom이 비어있을 때 에러 반환 / 또는 개수가 적은 경우
		// if(gameRoom.isEmpty())
		GameRoom gameRoom = new GameRoom();

		return optionalGameRoom.map(gameRoom::toDto).orElse(null);
	}
}