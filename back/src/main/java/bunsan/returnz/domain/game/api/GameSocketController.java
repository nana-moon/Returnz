package bunsan.returnz.domain.game.api;

import java.util.Date;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	public void sendToGameRoom(RoomMessageDto roomMessageDto, @Header("Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		// log.info("tokendd"+token);
		if (roomMessageDto.getType().equals(RoomMessageDto.MessageType.ENTER)) {
			gameSocketService.sendEnterMessage(roomMessageDto, token);
		} else if (roomMessageDto.getType().equals(RoomMessageDto.MessageType.READY)) {
			gameSocketService.sendReadyMessage(roomMessageDto, token);
		} else if (roomMessageDto.getType().equals(RoomMessageDto.MessageType.CHAT)) {
			gameSocketService.sendChatMessage(roomMessageDto, token);
		} else if (roomMessageDto.getType().equals(RoomMessageDto.MessageType.END)) {
			gameSocketService.sendEndMessage(roomMessageDto);
		} else {
			throw new BadRequestException("요청 타입이 올바르지 않습니다.");
		}
	}

	// @GetMapping("/api/server-time")
	// public ResponseEntity sendServerTime(Map request) {
	// 	String gameRoomId = (String)request.get("roomId");
	// 	if (gameRoomId == null) {
	// 		throw new BadRequestException("게임룸 id를 입력해주세요.");
	// 	} else {
	// 		Date returnDate = gameSocketService.sendServerTime(gameRoomId);
	// 		return ResponseEntity.ok(Map.of("returnTime", returnDate));
	// 	}
	// }
}
