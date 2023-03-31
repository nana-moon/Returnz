package bunsan.returnz.domain.waiting.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.member.enums.MemberState;
import bunsan.returnz.domain.sidebar.service.SideBarService;
import bunsan.returnz.domain.waiting.dto.WaitMessageDto;
import bunsan.returnz.global.advice.exception.NotFoundException;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.infra.redis.service.RedisPublisher;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.entity.WaitRoom;
import bunsan.returnz.persist.repository.RedisWaitRepository;
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
	private final RedisPublisher redisPublisher;
	private final RedisWaitRepository redisWaitRepository;
	private final SideBarService sideBarService;

	public WaitRoom createWaitRoom(String token) {
		// 엔티티 생성
		Member captain = jwtTokenProvider.getMember(token);

		WaitRoom waitRoom = WaitRoom.builder()
			.roomId(UUID.randomUUID().toString())
			.captainName(captain.getUsername())
			.build();

		return waitRoomRepository.save(waitRoom);
	}

	@Transactional
	public void sendEnterMessage(WaitMessageDto waitRequest, String token) {
		Member member = jwtTokenProvider.getMember(token);
		String roomId = (String)waitRequest.getMessageBody().get("roomId");
		WaitRoom waitRoom = waitRoomRepository.findByRoomId(roomId)
			.orElseThrow(() -> new NotFoundException("해당 대기방을 찾을 수 없습니다."));

		// 온라인인지 확인 후 변경
		sideBarService.checkState(member, MemberState.ONLINE);

		// 평균 수익률 계산
		// double avgProfit = (double)member.getAccumulatedReturn() / member.getGameCount() * 100;
		// avgProfit = Math.round(avgProfit * 100) / 100.0; // 둘째자리까지 반올림
		double avgProfit = member.getAvgProfit();
		// 새로운 대기방 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("roomId", roomId);
		messageBody.put("id", member.getId());
		messageBody.put("username", member.getUsername());
		messageBody.put("nickname", member.getNickname());
		messageBody.put("profileIcon", member.getProfileIcon().getCode());
		messageBody.put("avgProfit", avgProfit);
		messageBody.put("captainName", waitRoom.getCaptainName());

		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
			.type(WaitMessageDto.MessageType.ENTER)
			.messageBody(messageBody)
			.build();

		log.info(waitMessageDto.toString());

		// 메세지 보내기
		// simpMessagingTemplate.convertAndSend("/sub/wait-room/" + roomId, waitMessageDto);

		// WaitRoom 정보 업데이트 (인원 등등)
		// 맴버 수 +1 > 부정확할 거 같음
		// waitRoom.plusMemberCount();
		// waitRoomRepository.save(waitRoom);
		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitMessageDto);

	}

	@Transactional
	public void sendChatMessage(WaitMessageDto waitRequest, String token) {
		Member member = jwtTokenProvider.getMember(token);
		String roomId = (String)waitRequest.getMessageBody().get("roomId");
		// 새로운 대기방 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("nickname", member.getNickname());
		messageBody.put("contents", waitRequest.getMessageBody().get("contents"));
		messageBody.put("roomId", roomId);

		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
			.type(WaitMessageDto.MessageType.CHAT)
			.messageBody(messageBody)
			.build();

		// simpMessagingTemplate.convertAndSend("/sub/wait-room/" + roomId, waitMessageDto);
		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitMessageDto);
	}

	@Transactional
	public void sendExitMessage(WaitMessageDto waitRequest, String token) {
		Member member = jwtTokenProvider.getMember(token);
		String roomId = (String)waitRequest.getMessageBody().get("roomId");
		// 새로운 대기방 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("roomId", roomId);
		messageBody.put("id", member.getId());
		messageBody.put("username", member.getUsername());

		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
			.type(WaitMessageDto.MessageType.EXIT)
			.messageBody(messageBody)
			.build();
		// simpMessagingTemplate.convertAndSend("/sub/wait-room/" + roomId, waitMessageDto);
		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitMessageDto);
	}

	@Transactional
	public void sendGameSetting(WaitMessageDto waitRequest) {
		// 새로운 대기방 메세지 바디생성
		Map<String, Object> returnBody = waitRequest.getMessageBody();
		returnBody.remove("roomId");

		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
			.type(WaitMessageDto.MessageType.SETTING)
			.messageBody(returnBody)
			.build();

		String roomId = (String)waitRequest.getMessageBody().get("roomId");
		// simpMessagingTemplate.convertAndSend("/sub/wait-room/" + roomId, waitMessageDto);
		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitMessageDto);
	}
}
