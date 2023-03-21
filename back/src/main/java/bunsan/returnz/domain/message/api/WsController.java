package bunsan.returnz.domain.message.api;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.message.dto.FriendInfo;
import bunsan.returnz.domain.message.dto.FriendRequestDto;
import bunsan.returnz.domain.message.sevice.MessageService;
import bunsan.returnz.persist.entity.FriendRequest;
import lombok.RequiredArgsConstructor;

//----------------------------------------컨트롤러 명 변경 필요------------------------------------------
@RestController
@RequiredArgsConstructor
public class WsController {
	private final MessageService messageService;

	@PostMapping("/send-message") // 임시 테스트
	public void sendMessage(@RequestBody final FriendRequestDto request) {
		messageService.notifyFrontend(request);

	}
	//====================================친구 요청 송신=========================================

	@PostMapping("/send-private-message")
	public void sendPrivateMessage(@RequestBody FriendRequestDto request,
		@RequestHeader(value = "Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		messageService.notifyUser(request, token);

	}
	//====================================친구 요청 불러오기=========================================

	@GetMapping("/api/requests")
	public ResponseEntity<Map> getRequestList(@RequestHeader(value = "Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		List<FriendRequest> requestList = messageService.getRequestList(token);
		return ResponseEntity.ok(Map.of("friendRequestList", requestList));
	}
	//====================================친구 요청 거절=========================================

	@DeleteMapping("/api/requests/{id}")
	public ResponseEntity deleteRequest(@RequestHeader(value = "Authorization") String bearerToken,
		@PathVariable Long id) {
		String token = bearerToken.substring(7);
		messageService.deleteRequest(id, token);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	//====================================친구 요청 수락=========================================
	@PostMapping("/api/friends")
	public ResponseEntity addFriend(@RequestBody Map<String, Long> request,
		@RequestHeader(value = "Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		messageService.addFriend(request.get("id"), token);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	//=================================친구 리스트 불러오기======================================

	@GetMapping("api/friends")
	public ResponseEntity<Map> getFriends(@RequestHeader(value = "Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		List<FriendInfo> friendList = messageService.getFriendList(token);
		return ResponseEntity.ok(Map.of("friendList", friendList));
	}
	//==================================친구 삭제=====================================

	@DeleteMapping("/api/friends/{id}")
	public ResponseEntity deleteFriend(@RequestHeader(value = "Authorization") String bearerToken,
		@PathVariable Long id) {
		String token = bearerToken.substring(7);
		messageService.deleteFriend(id, token);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
