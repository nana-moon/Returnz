package bunsan.returnz.domain.message.sevice;

import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.message.dto.FriendRequestDto;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.ConflictException;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.persist.entity.FriendRequest;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.repository.FriendRequestRepository;
import bunsan.returnz.persist.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final NotificationService notificationService;
	private final FriendRequestRepository friendRequestRepository;
	private final MemberRepository memberRepository;
	private final JwtTokenProvider jwtTokenProvider;



	public void notifyFrontend(final FriendRequestDto request) {
		// ResponseMessaage response = new ResponseMessaage(message);
		notificationService.sendGlobalNotification();
		simpMessagingTemplate.convertAndSend("/topic/messages", request);
	}

	public void notifyUser(final FriendRequestDto request) {
		// ResponseMessaage response = new ResponseMessaage(message);
		// notificationService.sendPrivateNotification(request.getTargetUsername());
		checkValidRequest(request.getRequestUsername(), request.getTargetUsername());


		// 친구 요청 존재 여부 확인
		if (friendRequestRepository.existsFriendRequestByRequestUsernameAndTargetUsername(request.getRequestUsername(),
			request.getTargetUsername())) {
			throw new ConflictException("이미 요청을 보낸 유저입니다.");
		}
		// DB에 저장
		friendRequestRepository.save(request.toEntity());

		// 이 topic을 구독한 유저에게 전달
		simpMessagingTemplate.convertAndSendToUser(request.getTargetUsername(), "/topic/private-messages", request);
	}

	public List<FriendRequest> getRequestList(String token) {
		// token에 저장된 Member > 요청한 사람
		Member me = jwtTokenProvider.getMember(token);
		// 이 사람한테 온 모든 요청 출력
		List<FriendRequest> requestList = friendRequestRepository.findAllByTargetUsername(me.getUsername());
		return requestList;
	}

	public void addFriend(FriendRequest request) {
		List<Member> result = checkValidRequest(request.getRequestUsername(), request.getTargetUsername());
		Member requestMember = result.get(0);
		Member targetMember = result.get(1);
		requestMember.addFriend(targetMember);
		targetMember.addFriend(requestMember);
		memberRepository.save(requestMember);
		memberRepository.save(targetMember);
		friendRequestRepository.deleteById(request.getId());
		// friendRequestRepository.deleteFriendRequestByRequestUsernameAndTargetUsername(request.targetUsername, request.requestUsername);
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
		};
		return new ArrayList<Member>(){{
			add(requestMember);
			add(targetMember);
		}};
	}
}
