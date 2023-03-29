package bunsan.returnz.domain.game.api;

import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.game.dto.RoomMessageDto;
import bunsan.returnz.domain.game.service.GameSocketService;
import bunsan.returnz.global.advice.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GameSocketController {
	private final GameSocketService gameSocketService;

	@MessageMapping("/game-room")
	public void sendToGameRoom(RoomMessageDto gameRequest, @Header("Authorization") String bearerToken) {
		// String token = bearerToken.substring(7);
		if (gameRequest.getType().equals(RoomMessageDto.MessageType.READY)
			|| gameRequest.getType().equals(RoomMessageDto.MessageType.TURN)
			|| gameRequest.getType().equals(RoomMessageDto.MessageType.CHAT)) {
			gameSocketService.sendPublicMessage(gameRequest);
		} else {
			throw new BadRequestException("요청 타입이 올바르지 않습니다.");
		}
	}
}
