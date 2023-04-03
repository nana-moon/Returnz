package bunsan.returnz.domain.friend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.friend.dto.FriendInfo;
import bunsan.returnz.domain.friend.dto.FriendRequestDto;
import bunsan.returnz.domain.sidebar.dto.SideMessageDto;
import bunsan.returnz.domain.sidebar.service.SideBarService;
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

@Service
@RequiredArgsConstructor
public class FriendService {
	private final FriendRequestRepository friendRequestRepository;
	private final MemberRepository memberRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final SideBarService sideBarService;
	private final RedisPublisher redisPublisher;
	private final RedisSideBarRepository redisSideBarRepository;


	public List<FriendRequestDto> getRequestList(String token) {
		// token에 저장된 Member > 요청한 사람
		Member me = jwtTokenProvider.getMember(token);
		// 이 사람한테 온 모든 요청 출력
		List<FriendRequest> requestList = friendRequestRepository.findAllByTargetUsername(me.getUsername());
		List<FriendRequestDto> requestDtoList = new ArrayList<>();
		for (FriendRequest request : requestList) {
			Member requester = memberRepository.findByUsername(request.getRequestUsername())
				.orElseThrow(() -> new NotFoundException("요청 유저를 찾을 수 없습니다."));
			FriendRequestDto dto = request.toDto(requester);
			requestDtoList.add(dto);
		}
		return requestDtoList;
	}

	public void addFriend(Long id, String token) {
		// token에 저장된 Member > 요청한 사람
		Member me = jwtTokenProvider.getMember(token);
		if (me.getFriends().size() >= 20) {
			throw new BadRequestException("친구는 20명을 넘을 수 없습니다.");
		}
		FriendRequest request = friendRequestRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("해당 요청이 존재하지 않습니다."));
		if (!request.getTargetUsername().equals(me.getUsername())) {
			throw new BadRequestException("요청 유저에 대한 친구 요청이 아닙니다.");
		}
		Member targetMember = memberRepository.findByUsername(request.getTargetUsername())
			.orElseThrow(() -> new NotFoundException("타겟 맴버가 삭제 되었습니다."));
		Member requestMember = memberRepository.findByUsername(request.getRequestUsername())
			.orElseThrow(() -> new NotFoundException("요청 맴버가 삭제 되었습니다."));

		if (requestMember.isFriend(targetMember)) {
			throw new ConflictException("이미 친구인 유저와 친구를 할 수 없습니다.");
		}

		requestMember.addFriend(targetMember);
		targetMember.addFriend(requestMember);
		memberRepository.save(requestMember);
		memberRepository.save(targetMember);
		friendRequestRepository.deleteById(request.getId());
	}

	public void deleteRequest(Long id, String token) {
		// token에 저장된 Member > 요청한 사람
		Member me = jwtTokenProvider.getMember(token);

		FriendRequest request = friendRequestRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("해당 요청이 존재하지 않습니다."));
		if (!request.getTargetUsername().equals(me.getUsername())) {
			throw new BadRequestException("요청 유저에 대한 친구 요청이 아닙니다.");
		}
		friendRequestRepository.deleteById(request.getId());
	}

	public List<FriendInfo> getFriendList(String token) {
		Member me = jwtTokenProvider.getMember(token);
		List<Member> friends = me.getFriends();
		List<FriendInfo> friendInfoList = new ArrayList<>();
		for (Member friend : friends) {
			friendInfoList.add(new FriendInfo(friend));
		}
		return friendInfoList;
	}

	public void deleteFriend(String username, String token) {
		Member me = jwtTokenProvider.getMember(token);
		List<Member> friends = me.getFriends();
		Boolean isPresent = false;
		for (Member friend : friends) {
			if (friend.getUsername().equals(username)) {
				Member targetFriend = memberRepository.findByUsername(username)
					.orElseThrow(() -> new NotFoundException("친구의 계정이 삭제되었습니다."));
				me.deleteFriend(targetFriend);
				targetFriend.deleteFriend(me);
				memberRepository.save(me);
				memberRepository.save(targetFriend);
				isPresent = true;
				break;
			}
		}
		if (!isPresent) {
			throw new BadRequestException("해당 유저와 친구가 아닙니다.");
		}
	}

	@Transactional
	public SideMessageDto sendFriendRequest(SideMessageDto sideRequest, String token) {
		// redisPublisher.publishSideBar(redisSideBarRepository.getTopic("side-bar"), sideRequest);
		Map<String, Object> requestBody = sideRequest.getMessageBody();

		// token에 저장된 Member > 요청한 사람
		Member requester = jwtTokenProvider.getMember(token);
		if (requester.getFriends().size() >= 20) {
			throw new BadRequestException("친구는 20명을 넘을 수 없습니다.");
		}
		String requestUsername = requester.getUsername();
		String targetUsername = (String)requestBody.get("username");

		sideBarService.checkValidRequest(requestUsername, targetUsername);

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
		messageBody.put("profileIcon", requester.getProfileIcon());
		SideMessageDto sideMessageDto = SideMessageDto.builder()
			.type(SideMessageDto.MessageType.FRIEND)
			.messageBody(messageBody)
			.build();
		// redisPublisher.publishSideBar(redisSideBarRepository.getTopic("side-bar"), sideMessageDto);
		return sideMessageDto;
	}
}
