package bunsan.returnz.domain.message.sevice;

import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.message.dto.FriendInfo;
import bunsan.returnz.domain.message.dto.FriendRequestDto;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.ConflictException;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.persist.entity.FriendRequest;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.repository.FriendRequestRepository;
import bunsan.returnz.persist.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

//--------------------------------------서비스 분리 필요---------------------------------------
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

	public void sendFriendRequest(final FriendRequestDto request, String token) {
		// ResponseMessaage response = new ResponseMessaage(message);
		// notificationService.sendPrivateNotification(request.getTargetUsername());
		// token에 저장된 Member > 요청한 사람
		Member me = jwtTokenProvider.getMember(token);
		if (!me.getUsername().equals(request.getRequestUsername())) {
			throw new BadRequestException("token 유저와 요청 유저가 일치하지 않습니다.");
		}
		checkValidRequest(request.getRequestUsername(), request.getTargetUsername());

		// 친구 요청 존재 여부 확인
		if (friendRequestRepository.existsFriendRequestByRequestUsernameAndTargetUsername(request.getRequestUsername(),
			request.getTargetUsername())) {
			throw new ConflictException("이미 요청을 보낸 유저입니다.");
		}
		// DB에 저장
		FriendRequest friendRequest = friendRequestRepository.save(request.toEntity());

		// 이 topic을 구독한 유저에게 전달 > 웹소켓 연결 안되어 있으면 어캄?
		simpMessagingTemplate.convertAndSendToUser(request.getTargetUsername(),
			"/sub/friend-request", friendRequest);
	}

	public List<FriendRequest> getRequestList(String token) {
		// token에 저장된 Member > 요청한 사람
		Member me = jwtTokenProvider.getMember(token);
		// 이 사람한테 온 모든 요청 출력
		List<FriendRequest> requestList = friendRequestRepository.findAllByTargetUsername(me.getUsername());
		return requestList;
	}

	public void addFriend(Long id, String token) {
		// token에 저장된 Member > 요청한 사람
		Member me = jwtTokenProvider.getMember(token);

		FriendRequest request = friendRequestRepository.findById(id)
			.orElseThrow(() -> new BadRequestException("해당 요청이 존재하지 않습니다."));
		if (!request.getTargetUsername().equals(me.getUsername())) {
			throw new BadRequestException("요청 유저에 대한 친구 요청이 아닙니다.");
		}
		Member targetMember = memberRepository.findByUsername(request.getTargetUsername())
				.orElseThrow(() -> new BadRequestException("타겟 맴버가 삭제 되었습니다."));
		Member requestMember = memberRepository.findByUsername(request.getRequestUsername())
			.orElseThrow(() -> new BadRequestException("요청 맴버가 삭제 되었습니다."));

		if (requestMember.isFriend(targetMember)) {
			throw new ConflictException("이미 친구인 유저와 친구를 할 수 없습니다.");
		}

		requestMember.addFriend(targetMember);
		targetMember.addFriend(requestMember);
		memberRepository.save(requestMember);
		memberRepository.save(targetMember);
		friendRequestRepository.deleteById(request.getId());
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

	public void deleteRequest(Long id, String token) {
		// token에 저장된 Member > 요청한 사람
		Member me = jwtTokenProvider.getMember(token);

		FriendRequest request = friendRequestRepository.findById(id)
			.orElseThrow(() -> new BadRequestException("해당 요청이 존재하지 않습니다."));
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

	public void deleteFriend(Long id, String token) {
		Member me = jwtTokenProvider.getMember(token);
		List<Member> friends = me.getFriends();
		Boolean isPresent = false;
		for (Member friend : friends) {
			if (friend.getId().equals(id)) {
				Member tagetFriend = memberRepository.findById(id)
					.orElseThrow(()-> new BadRequestException("친구의 게정이 삭제되었습니다."));
				me.deleteFriend(tagetFriend);
				tagetFriend.deleteFriend(me);
				memberRepository.save(me);
				memberRepository.save(tagetFriend);
				isPresent = true;
				break;
			}
		}
		if (!isPresent) {
			throw new BadRequestException("해당 유저와 친구가 아닙니다.");
		}
	}
}
