package bunsan.returnz.domain.sideBar.service;

import bunsan.returnz.domain.sideBar.dto.SideMessageDto;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.ConflictException;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.persist.entity.FriendRequest;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.repository.FriendRequestRepository;
import bunsan.returnz.persist.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class SideBarService {
    private final JwtTokenProvider jwtTokenProvider;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final FriendRequestRepository friendRequestRepository;
    private final MemberRepository memberRepository;

    public void sendFriendRequest(SideMessageDto sideRequest, String token) {
        Map<String, Object> requestBody = sideRequest.getMessageBody();

        // token에 저장된 Member > 요청한 사람
        Member requester = jwtTokenProvider.getMember(token);
        String requestUsername = requester.getUsername();
        String targetUsername = (String)requestBody.get("targetUsername");

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
        messageBody.put("username", requester.getUsername());
        messageBody.put("nickname", requester.getNickname());
        messageBody.put("profileIcon", requester.getProfileIcon());

        SideMessageDto sideMessageDto = SideMessageDto.builder()
                .type(SideMessageDto.MessageType.FRIEND)
                .messageBody(messageBody)
                .build();

         log.info(sideMessageDto.toString());

        // 이 topic을 구독한 유저에게 전달 > 웹소켓 연결 안되어 있으면 어캄?
        simpMessagingTemplate.convertAndSendToUser(requestUsername,
                "/sub/side-bar", sideMessageDto);
    }
    public void sendInviteMessage(SideMessageDto sideRequest, String token) {
        // token에 저장된 Member > 요청한 사람
        Member requester = jwtTokenProvider.getMember(token);
        Map<String, Object> requestBody = sideRequest.getMessageBody();

        // 새로운 사이드 메세지 생성
        Map<String, Object> messageBody = new HashMap<>();
        messageBody.put("roomId", requestBody.get("roomId"));
        messageBody.put("username", requester.getUsername());
        messageBody.put("nickname", requester.getNickname());
        messageBody.put("profileIcon", requester.getProfileIcon());

        SideMessageDto sideMessageDto = SideMessageDto.builder()
                .type(SideMessageDto.MessageType.INVITE)
                .messageBody(messageBody)
                .build();

        // 이 topic을 구독한 유저에게 전달 > 웹소켓 연결 안되어 있으면 어캄?
        simpMessagingTemplate.convertAndSendToUser((String) requestBody.get("targetUsername"),
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

}
