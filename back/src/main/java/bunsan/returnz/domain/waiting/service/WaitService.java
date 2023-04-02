package bunsan.returnz.domain.waiting.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import bunsan.returnz.domain.member.enums.MemberState;
import bunsan.returnz.domain.sidebar.service.SideBarService;
import bunsan.returnz.domain.waiting.dto.SettingDto;
import bunsan.returnz.domain.waiting.dto.WaitMessageDto;
import bunsan.returnz.global.advice.exception.BadRequestException;
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
		// String roomId = (String)waitRequest.getMessageBody().get("roomId");
		String roomId = checkWaitRoomId(waitRequest);
		WaitRoom waitRoom = waitRoomRepository.findByRoomId(roomId)
			.orElseThrow(() -> new NotFoundException("해당 대기방을 찾을 수 없습니다."));
		// 인원 증가 후 에외처리 4명 이상이면 예외처리
		waitRoom.plusMemberCount();
		waitRoomRepository.save(waitRoom);
		// 온라인인지 확인 후 변경
		sideBarService.checkState(member, MemberState.ONLINE);

		// 평균 수익률 계산
		double avgProfit = member.getAvgProfit();
		// 새로운 대기방 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("roomId", roomId);
		messageBody.put("id", member.getId());
		messageBody.put("username", member.getUsername());
		messageBody.put("nickname", member.getNickname());
		messageBody.put("profileIcon", member.getProfileIcon());
		messageBody.put("avgProfit", avgProfit);
		messageBody.put("captainName", waitRoom.getCaptainName());

		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
			.type(WaitMessageDto.MessageType.ENTER)
			.messageBody(messageBody)
			.build();

		log.info(waitMessageDto.toString());

		// 메세지 보내기
		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitMessageDto);

	}

	@Transactional
	public void sendChatMessage(WaitMessageDto waitRequest, String token) {
		Member member = jwtTokenProvider.getMember(token);
		String roomId = checkWaitRoomId(waitRequest);
		if (waitRequest.getMessageBody().get("contents") == null) {
			throw new BadRequestException("대화 내용이 없습니다.");
		}
		// 새로운 대기방 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("nickname", member.getNickname());
		messageBody.put("contents", waitRequest.getMessageBody().get("contents"));
		messageBody.put("roomId", roomId);

		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
			.type(WaitMessageDto.MessageType.CHAT)
			.messageBody(messageBody)
			.build();

		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitMessageDto);
	}

	@Transactional
	public void sendExitMessage(WaitMessageDto waitRequest, String token) {
		Member member = jwtTokenProvider.getMember(token);
		String roomId = checkWaitRoomId(waitRequest);
		// 새로운 대기방 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("roomId", roomId);
		messageBody.put("id", member.getId());
		messageBody.put("username", member.getUsername());

		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
			.type(WaitMessageDto.MessageType.EXIT)
			.messageBody(messageBody)
			.build();
		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitMessageDto);
	}

	@Transactional
	public void sendGameSetting(@Valid SettingDto settingDto) {
		// 새로운 대기방 메세지 바디생성
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> messageBody = mapper.convertValue(settingDto, Map.class);

		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
			.type(WaitMessageDto.MessageType.SETTING)
			.messageBody(messageBody)
			.build();

		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitMessageDto);
	}

	public void sendGameInfo(WaitMessageDto waitRequest) {
		if (waitRequest.getMessageBody().get("gameRoomId") == null) {
			throw new BadRequestException("게임룸 정보가 없습니다.");
		}
		checkWaitRoomId(waitRequest);
		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitRequest);
	}

	public String checkWaitRoomId(WaitMessageDto waitRequest) {
		if (waitRequest.getMessageBody().get("roomId") == null) {
			throw new BadRequestException("대기방 정보가 없습니다.");
		} else {
			return (String)waitRequest.getMessageBody().get("roomId");
		}
	}

	public WaitRoom minusWaitMemberCnt(String token, String roomId) {
		Member captain = jwtTokenProvider.getMember(token);
		WaitRoom waitRoom = waitRoomRepository.findByRoomId(roomId)
			.orElseThrow(() -> new NotFoundException("대기방을 찾을 수 없습니다."));
		if (!waitRoom.getCaptainName().equals(captain.getUsername())) {
			throw new BadRequestException("요청 유저가 방장이 아닙니다.");
		}
		waitRoom.minusMemberCount();
		return waitRoomRepository.save(waitRoom);
	}
}
