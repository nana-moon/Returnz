package bunsan.returnz.domain.wait.api;

import java.net.URI;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.message.dto.FriendRequestDto;
import bunsan.returnz.domain.message.sevice.MessageService;
import bunsan.returnz.domain.wait.dto.SideMessageDto;
import bunsan.returnz.domain.wait.dto.WaitMessageDto;
import bunsan.returnz.domain.wait.service.WaitService;
import bunsan.returnz.persist.entity.WaitRoom;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WaitController {
	private final WaitService waitService;

	//==================================사이드 바 메세지 송신===================================
	// @MessageMapping("/side-bar")
	@PostMapping("/side-bar")
	public void sendToSideBar(@RequestBody SideMessageDto sideRequest,
		@RequestHeader(value = "Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		if (sideRequest.getType().equals(SideMessageDto.MessageType.INVITE)) {
			waitService.sendInviteMessage(sideRequest, token);
		} else if (sideRequest.getType().equals(SideMessageDto.MessageType.FRIEND)) {
			waitService.sendFriendRequest(sideRequest, token);
		}
	}
	//====================================대기방 만드는 요청======================================
	@PostMapping("/api/wait-rooms")
	public ResponseEntity<WaitRoom> createWaitRoom(@RequestHeader(value = "Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		WaitRoom waitRoom = waitService.createWaitRoom(token);
		return ResponseEntity.ok().body(waitRoom);
	}
	//====================================대기방 만드는 요청======================================
	@PostMapping("/wait-rooms")
	public void sendToWaitRoom(@RequestHeader(value = "Authorization") String bearerToken, @RequestBody WaitMessageDto waitRequest) {
		String token = bearerToken.substring(7);
		if (waitRequest.getType().equals(WaitMessageDto.MessageType.ENTER)) {
			waitService.sendEnterMessage(waitRequest, token);
		} else if (waitRequest.getType().equals(WaitMessageDto.MessageType.CHAT)) {
			waitService.sendChatMessage(waitRequest, token);
		}
	}
}
