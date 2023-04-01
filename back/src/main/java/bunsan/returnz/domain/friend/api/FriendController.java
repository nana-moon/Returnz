package bunsan.returnz.domain.friend.api;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.friend.dto.FriendInfo;
import bunsan.returnz.domain.friend.dto.FriendRequestDto;
import bunsan.returnz.domain.friend.service.FriendService;
import bunsan.returnz.domain.sidebar.dto.SideMessageDto;
import lombok.RequiredArgsConstructor;

// TODO: 2023-03-29 프론트 서버에 맞게 CrossOrigin 변경

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FriendController {
	private final FriendService friendService;

	//----------------------------------친구 요청 불러오기-----------------------------------
	@GetMapping("/api/requests")
	public ResponseEntity<Map> getRequestList(@RequestHeader(value = "Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		List<FriendRequestDto> requestDtoList = friendService.getRequestList(token);
		return ResponseEntity.ok(Map.of("friendRequestList", requestDtoList));
	}

	//-----------------------------------친구 요청 거절--------------------------------------
	@DeleteMapping("/api/requests/{id}")
	public ResponseEntity deleteRequest(@RequestHeader(value = "Authorization") String bearerToken,
		@PathVariable Long id) {
		String token = bearerToken.substring(7);
		friendService.deleteRequest(id, token);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	//-----------------------------------친구 요청 수락----------------------------------------
	@PostMapping("/api/friends/{id}")
	public ResponseEntity addFriend(@RequestHeader(value = "Authorization") String bearerToken,
		@PathVariable Long id) {
		String token = bearerToken.substring(7);
		friendService.addFriend(id, token);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	//------------------------------친구 리스트 불러오기 > 소켓으로 바꿈--------------------------------
	@GetMapping("api/friends")
	public ResponseEntity<Map> getFriends(@RequestHeader(value = "Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		List<FriendInfo> friendList = friendService.getFriendList(token);
		return ResponseEntity.ok(Map.of("friendList", friendList));
	}

	//----------------------------------------친구 삭제---------------------------------------------
	@DeleteMapping("/api/friends")
	public ResponseEntity deleteFriend(@RequestHeader(value = "Authorization") String bearerToken,
		@RequestParam String username) {
		String token = bearerToken.substring(7);
		friendService.deleteFriend(username, token);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	//-----------------------------------친구 요청 생성-------------------------------------
	@PostMapping("/api/requests")
	public ResponseEntity sendFriendRequest(@RequestHeader(value = "Authorization") String bearerToken,
		@RequestBody SideMessageDto sideRequest) {
		String token = bearerToken.substring(7);
		SideMessageDto sideResponse = friendService.sendFriendRequest(sideRequest, token);
		return ResponseEntity.ok(sideResponse);
	}
}
