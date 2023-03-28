package bunsan.returnz.domain.waiting.api;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import bunsan.returnz.domain.waiting.dto.WaitMessageDto;
import bunsan.returnz.domain.waiting.service.WaitService;
import bunsan.returnz.persist.entity.WaitRoom;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WaitController {
	private final WaitService waitService;

	//----------------------------------대기방 만드는 요청------------------------------------
	@PostMapping("/api/wait-room")
	public ResponseEntity<WaitRoom> createWaitRoom(@RequestHeader(value = "Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		WaitRoom waitRoom = waitService.createWaitRoom(token);
		return ResponseEntity.ok().body(waitRoom);
	}

	//------------------------------------대기방 송신 요청-------------------------------------
	@MessageMapping("/wait-room")
	public void sendToWaitRoom(WaitMessageDto waitRequest, @Header("Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		if (waitRequest.getType().equals(WaitMessageDto.MessageType.ENTER)) {
			waitService.sendEnterMessage(waitRequest, token);
		} else if (waitRequest.getType().equals(WaitMessageDto.MessageType.CHAT)) {
			waitService.sendChatMessage(waitRequest, token);
		} else if (waitRequest.getType().equals(WaitMessageDto.MessageType.EXIT)) {
			waitService.sendExitMessage(waitRequest, token);
		} else {
			waitService.sendGameSetting(waitRequest);
		}
	}
}
