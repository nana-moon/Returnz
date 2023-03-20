package bunsan.returnz.domain.message.api;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.message.dto.FriendRequestDto;
import bunsan.returnz.domain.message.sevice.MessageService;
import bunsan.returnz.persist.entity.FriendRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WsController {
	private final MessageService messageService;

	@PostMapping("/send-message")
	public void sendMessage(@RequestBody final FriendRequestDto request) {
		messageService.notifyFrontend(request);

	}

	@PostMapping("/send-private-message")
	public void sendPrivateMessage(@RequestBody FriendRequestDto request) {
		messageService.notifyUser(request);

	}

	@GetMapping("/api/requests")
	public ResponseEntity<?> getRequestList(@RequestHeader(value = "Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		List<FriendRequest> requestList = messageService.getRequestList(token);
		return ResponseEntity.ok().body(Map.of("friendRequestList", requestList));
	}

	//====================================친구 요청 수락=========================================
	@PostMapping("/api/friends")
	public ResponseEntity addFriend(@RequestBody Map request, @RequestHeader(value = "Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		messageService.addFriend((Long)request.get("id"), token);
		return new ResponseEntity<>(Map.of("result", "ok"), HttpStatus.CREATED);
	}

}
