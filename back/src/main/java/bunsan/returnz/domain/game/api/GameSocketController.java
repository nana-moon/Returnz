package bunsan.returnz.domain.game.api;

import java.util.Date;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import bunsan.returnz.domain.game.dto.RoomMessageDto;
import bunsan.returnz.domain.game.service.GameSocketService;
import bunsan.returnz.global.advice.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
public class GameSocketController {
	private final GameSocketService gameSocketService;

	@MessageMapping("/game-room")
	public void sendToGameRoom(@Valid RoomMessageDto roomMessageDto, @Header("Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		// log.info("tokendd"+token);
		if (roomMessageDto.getType().equals(RoomMessageDto.MessageType.ENTER)) {
			gameSocketService.sendEnterMessage(roomMessageDto, token);
		} else if (roomMessageDto.getType().equals(RoomMessageDto.MessageType.READY)) {
			gameSocketService.sendReadyMessage(roomMessageDto, token);
		} else if (roomMessageDto.getType().equals(RoomMessageDto.MessageType.CHAT)) {
			gameSocketService.sendChatMessage(roomMessageDto, token);
		} else {
			throw new BadRequestException("요청 타입이 올바르지 않습니다.");
		}


	}

	@GetMapping("/api/server-time")
	public ResponseEntity sendServerTime(@RequestParam @NotBlank  String roomId) {
		String returnTime = gameSocketService.sendServerTime(roomId);
		return ResponseEntity.ok(Map.of("returnTime", returnTime));
	}
	// @PostMapping("/api/result-room")
	// public ResponseEntity createResultRoom(@RequestParam @NotBlank String gameRoomId) {
	// 	String resultRoomId = gameSocketService.createResultRoom(gameRoomId);
	// 	return ResponseEntity.ok(Map.of("resultRoomId", resultRoomId));
	// }

}
