package bunsan.returnz.domain.wait.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


import bunsan.returnz.domain.wait.dto.SideMessageDto;
import bunsan.returnz.domain.wait.dto.WaitMessageDto;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.ConflictException;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.persist.entity.FriendRequest;
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

	public void sendInviteMessage(SideMessageDto sideRequest, String token) {
		Map<String, Object> messageBody = sideRequest.getMessageBody();

		// 이 topic을 구독한 유저에게 전달 > 웹소켓 연결 안되어 있으면 어캄?
		simpMessagingTemplate.convertAndSendToUser((String)messageBody.get("targetUsername"),
			"/sub/side-bar", sideRequest);
	}

	public void sendFriendRequest(SideMessageDto sideRequest, String token) {
		Map<String, Object> messageBody = sideRequest.getMessageBody();
		// ResponseMessaage response = new ResponseMessaage(message);
		// notificationService.sendPrivateNotification(request.getTargetUsername());
		// token에 저장된 Member > 요청한 사람
		Member me = jwtTokenProvider.getMember(token);
		String requestUsername = (String)messageBody.get("requestUsername");
		String targetUsername = (String)messageBody.get("targetUsername");
		if (!me.getUsername().equals(requestUsername)) {
			throw new BadRequestException("token 유저와 요청 유저가 일치하지 않습니다.");
		}
		checkValidRequest(requestUsername, targetUsername);

		// 친구 요청 존재 여부 확인
		if (friendRequestRepository.existsFriendRequestByRequestUsernameAndTargetUsername(requestUsername,
			targetUsername)) {
			throw new ConflictException("이미 요청을 보낸 유저입니다.");
		}
		FriendRequest friendRequest = FriendRequest.builder()
			.requestUsername(requestUsername)
			.targetUsername(targetUsername)
			.build();
		// DB에 저장
		FriendRequest savedRequest = friendRequestRepository.save(friendRequest);

		// 새로운 사이드 메세지 생성 ..
		Map<String, Object> newMap = new HashMap<>();
		newMap.put("id", savedRequest.getId());
		newMap.put("requestUsername", savedRequest.getRequestUsername());
		newMap.put("targetUsername", savedRequest.getTargetUsername());

		SideMessageDto sideMessageDto = SideMessageDto.builder()
			.type(SideMessageDto.MessageType.FRIEND)
				.messageBody(newMap)
					.build();
		log.info(sideMessageDto.toString());
		// 이 topic을 구독한 유저에게 전달 > 웹소켓 연결 안되어 있으면 어캄?
		simpMessagingTemplate.convertAndSendToUser(requestUsername,
			"/sub/side-bar", sideMessageDto);
	}
	private List<Member> checkValidRequest(String requestUsername, String targetUsername) {
		// 우선 확인 사항
		// Member 반환
		Member requestMember = memberRepository.findByUsername(requestUsername)
			.orElseThrow(()-> new BadRequestException("요청 유저가 존재하지 않습니다."));
		Member targetMember = memberRepository.findByUsername(targetUsername)
			.orElseThrow(()-> new BadRequestException("대상 유저가 존재하지 않습니다."));
		if (requestMember.equals(targetMember)) {
			throw new BadRequestException("자신과 친구를 할 수 없습니다.");
		}
		// 둘이 친구인지 확인
		if (requestMember.isFriend(targetMember)) {
			throw new ConflictException("이미 친구인 유저와 친구를 할 수 없습니다.");
		}
		return new ArrayList<Member>() {
			{
				add(requestMember);
				add(targetMember);
			}
		};
	}

	public void sendEnterMessage(WaitMessageDto waitRequest, String token) {
		// 메세지 보내기
		// WaitRoom 정보 업데이트 (인원 등등)
	}

	public void sendChatMessage(WaitMessageDto waitRequest, String token) {
	}
}
