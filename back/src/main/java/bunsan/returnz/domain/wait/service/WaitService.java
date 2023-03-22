package bunsan.returnz.domain.wait.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import bunsan.returnz.domain.sideBar.dto.SideMessageDto;
import bunsan.returnz.global.advice.exception.NotFoundException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


import bunsan.returnz.domain.wait.dto.WaitMessageDto;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.entity.WaitRoom;
import bunsan.returnz.persist.repository.FriendRequestRepository;
import bunsan.returnz.persist.repository.MemberRepository;
import bunsan.returnz.persist.repository.WaitRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class WaitService {
	private final JwtTokenProvider jwtTokenProvider;
	private final WaitRoomRepository waitRoomRepository;
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final FriendRequestRepository friendRequestRepository;
	private final MemberRepository memberRepository;
	public WaitRoom createWaitRoom(String token) {
		// 엔티티 생성...
		Member captain = jwtTokenProvider.getMember(token);

		WaitRoom waitRoom =  WaitRoom.builder()
			.roomId(UUID.randomUUID().toString())
			.captainName(captain.getUsername())
			.build();

		return waitRoomRepository.save(waitRoom);
	}

	public void sendEnterMessage(WaitMessageDto waitRequest, String token) {
		Member member = jwtTokenProvider.getMember(token);
		String roomId = (String) waitRequest.getMessageBody().get("roomId");
		WaitRoom waitRoom = waitRoomRepository.findByRoomId(roomId)
				.orElseThrow(() -> new NotFoundException("해당 대기방을 찾을 수 없습니다."));

		// 새로운 대기방 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("username", member.getUsername());
		messageBody.put("nickname", member.getNickname());
		messageBody.put("profileIcon", member.getProfileIcon());
		messageBody.put("captainName", waitRoom.getCaptainName());

		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
				.type(WaitMessageDto.MessageType.ENTER)
				.messageBody(messageBody)
				.build();

		log.info(waitMessageDto.toString());

		// 메세지 보내기
//		simpMessagingTemplate.convertAndSend(requestUsername, "/sub/side-bar", sideMessageDto);
		// WaitRoom 정보 업데이트 (인원 등등)
	}

	public void sendChatMessage(WaitMessageDto waitRequest, String token) {
	}

	public void sendExitMessage(WaitMessageDto waitRequest, String token) {
	}
}
