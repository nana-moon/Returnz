package bunsan.returnz.domain.sidebar.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

// import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.friend.dto.FriendInfo;
import bunsan.returnz.domain.member.enums.MemberState;
import bunsan.returnz.domain.sidebar.dto.SideMessageDto;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.ConflictException;
import bunsan.returnz.global.advice.exception.NotFoundException;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.infra.redis.service.RedisPublisher;
import bunsan.returnz.persist.entity.FriendRequest;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.repository.FriendRequestRepository;
import bunsan.returnz.persist.repository.MemberRepository;
import bunsan.returnz.persist.repository.RedisSideBarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SideBarService {
	private final JwtTokenProvider jwtTokenProvider;
	// private final SimpMessagingTemplate simpMessagingTemplate;
	private final FriendRequestRepository friendRequestRepository;
	private final MemberRepository memberRepository;
	private final RedisPublisher redisPublisher;
	private final RedisSideBarRepository redisSideBarRepository;

	@Transactional
	public void sendFriendRequest(SideMessageDto sideRequest, String token) {
		Map<String, Object> requestBody = sideRequest.getMessageBody();

		// token에 저장된 Member > 요청한 사람
		Member requester = jwtTokenProvider.getMember(token);
		if (requester.getFriends().size() >= 20) {
			throw new BadRequestException("친구는 20명을 넘을 수 없습니다.");
		}
		String requestUsername = requester.getUsername();
		String targetUsername = (String)requestBody.get("username");

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

		// 새로운 사이드 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("requestId", savedRequest.getId());
		messageBody.put("username", targetUsername);
		messageBody.put("requestUsername", requester.getUsername());
		messageBody.put("nickname", requester.getNickname());
		messageBody.put("profileIcon", requester.getProfileIcon().getCode());

		SideMessageDto sideMessageDto = SideMessageDto.builder()
			.type(SideMessageDto.MessageType.FRIEND)
			.messageBody(messageBody)
			.build();

		log.info(sideMessageDto.toString());

		// 이 topic을 구독한 유저에게 전달 > 웹소켓 연결 안되어 있으면 어캄?
		// simpMessagingTemplate.convertAndSendToUser(targetUsername,
		// 	"/sub/side-bar", sideMessageDto);
		redisPublisher.publishSideBar(redisSideBarRepository.getTopic("side-bar"), sideMessageDto);
	}

	@Transactional
	public void sendInviteMessage(SideMessageDto sideRequest, String token) {
		// token에 저장된 Member > 요청한 사람
		Map<String, Object> requestBody = sideRequest.getMessageBody();
		Member requester = jwtTokenProvider.getMember(token);

		// 새로운 사이드 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("roomId", requestBody.get("roomId"));
		messageBody.put("username", requester.getUsername());
		messageBody.put("nickname", requester.getNickname());
		messageBody.put("profileIcon", requester.getProfileIcon().getCode());

		SideMessageDto sideMessageDto = SideMessageDto.builder()
			.type(SideMessageDto.MessageType.INVITE)
			.messageBody(messageBody)
			.build();

		// 이 topic을 구독한 유저에게 전달 > 웹소켓 연결 안되어 있으면 어캄?
		// simpMessagingTemplate.convertAndSendToUser((String)requestBody.get("targetUsername"),
		// 	"/sub/side-bar", sideMessageDto);
		redisPublisher.publishSideBar(redisSideBarRepository.getTopic("side-bar"), sideMessageDto);
	}

	private void checkValidRequest(String requestUsername, String targetUsername) {
		// 우선 확인 사항
		// Member 반환
		Member requestMember = memberRepository.findByUsername(requestUsername)
			.orElseThrow(() -> new BadRequestException("요청 유저가 존재하지 않습니다."));
		Member targetMember = memberRepository.findByUsername(targetUsername)
			.orElseThrow(() -> new BadRequestException("대상 유저가 존재하지 않습니다."));
		if (requestMember.equals(targetMember)) {
			throw new BadRequestException("자신과 친구를 할 수 없습니다.");
		}
		// 둘이 친구인지 확인
		if (requestMember.isFriend(targetMember)) {
			throw new ConflictException("이미 친구인 유저와 친구를 할 수 없습니다.");
		}
	}

	@Transactional
	public void sendEnterMessage(String username) {
		// member 조회 후 online으로 바꿔주기
		Member member = memberRepository.findByUsername(username)
			.orElseThrow(() -> new NotFoundException("요청 맴버를 찾을 수 없습니다."));

		// 상태 확인 후 변경
		checkOnline(member);

		// 친구 조회 후 상태 전부 리턴
		List<FriendInfo> friendInfoList = new ArrayList<>();
		for (Member friend : member.getFriends()) {
			friendInfoList.add(new FriendInfo(friend));
		}

		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("friendList", friendInfoList);
		messageBody.put("username", username);

		SideMessageDto sideMessageDto = SideMessageDto.builder()
			.type(SideMessageDto.MessageType.ENTER)
			.messageBody(messageBody)
			.build();

		// 이 topic을 구독한 유저에게 전달 > 웹소켓 연결 안되어 있으면 어캄?
		// simpMessagingTemplate.convertAndSendToUser(username,
		// 	"/sub/side-bar", sideMessageDto);

		redisPublisher.publishSideBar(redisSideBarRepository.getTopic("side-bar"), sideMessageDto);

		// 친구들 모두에게 소켓으로 쏴줌 ..ㅋㅋ
		// log.info("222");
	}

	public void checkOnline(Member member) {
		if (!member.getState().equals(MemberState.ONLINE)) {
			// log.info("222");
			member.changeState(MemberState.ONLINE);
			memberRepository.save(member);
			// 친구들에게 전송
			for (Member friend : member.getFriends()) {
				Map<String, Object> messageBody = new HashMap<>();
				messageBody.put("friendName", friend.getUsername());
				messageBody.put("username", member.getUsername());

				SideMessageDto sideMessageDto = SideMessageDto.builder()
					.type(SideMessageDto.MessageType.STATE)
					.messageBody(messageBody)
					.build();
				// simpMessagingTemplate.convertAndSendToUser(friend.getUsername(),
				// 	"/sub/side-bar", sideMessageDto);
				redisPublisher.publishSideBar(redisSideBarRepository.getTopic("side-bar"), sideMessageDto);
			}
		}
	}

	public void sendExitMessage(SideMessageDto sideRequest, String token) {
	}
}
