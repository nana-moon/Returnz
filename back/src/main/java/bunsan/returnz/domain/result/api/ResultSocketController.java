package bunsan.returnz.domain.result.api;

import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.game.dto.RoomMessageDto;
import bunsan.returnz.domain.result.service.ResultSocketService;
import bunsan.returnz.global.advice.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ResultSocketController {
	private final ResultSocketService resultSocketService;

	@MessageMapping("/result-room")
	public void sendToResultRoom(RoomMessageDto roomMessageDto, @Header("Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		if (roomMessageDto.getType().equals(RoomMessageDto.MessageType.CHAT)) {
			resultSocketService.sendChatMessage(roomMessageDto, token);
		} else {
			throw new BadRequestException("요청 타입이 올바르지 않습니다.");
		}
	}
}
