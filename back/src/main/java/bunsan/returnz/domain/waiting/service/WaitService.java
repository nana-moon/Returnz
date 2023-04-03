package bunsan.returnz.domain.waiting.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import bunsan.returnz.domain.member.enums.MemberState;
import bunsan.returnz.domain.sidebar.service.SideBarService;
import bunsan.returnz.domain.waiting.dto.SettingDto;
import bunsan.returnz.domain.waiting.dto.WaitMessageDto;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.ConflictException;
import bunsan.returnz.global.advice.exception.NotFoundException;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.infra.redis.service.RedisPublisher;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.entity.WaitRoom;
import bunsan.returnz.persist.entity.Waiter;
import bunsan.returnz.persist.repository.RedisWaitRepository;
import bunsan.returnz.persist.repository.WaitRoomRepository;
import bunsan.returnz.persist.repository.WaiterRepository;
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
	private final WaiterRepository waiterRepository;

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
		WaitRoom waitRoom = checkWaitRoomId(waitRequest);
		// 인원 증가 후 에외처리 4명 이상이면 예외처리
		waitRoom.plusMemberCount();
		waitRoomRepository.save(waitRoom);
		// 온라인인지 확인 후 변경
		sideBarService.checkState(member, MemberState.ONLINE);

		// 평균 수익률 계산
		double avgProfit = member.getAvgProfit();
		// 새로운 대기방 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("roomId", waitRoom.getRoomId());
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
		String roomId = checkWaitRoomId(waitRequest).getRoomId();
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
		WaitRoom waitRoom = checkWaitRoomId(waitRequest);

		waitRoom.minusMemberCount();
		waitRoomRepository.save(waitRoom);

		// 새로운 대기방 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("roomId", waitRoom.getRoomId());
		messageBody.put("username", member.getUsername());

		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
			.type(WaitMessageDto.MessageType.EXIT)
			.messageBody(messageBody)
			.build();
		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitMessageDto);
	}

	@Transactional
	public void sendGameSetting(@Valid SettingDto settingDto) {
		String roomId = settingDto.getRoomId();
		WaitRoom waitRoom = waitRoomRepository.findByRoomId(roomId)
			.orElseThrow(() -> new NotFoundException("해당 대기방이 없습니다."));
		waitRoom.changeTheme(settingDto.getTheme());
		waitRoomRepository.save(waitRoom);
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

	public WaitRoom checkWaitRoomId(WaitMessageDto waitRequest) {
		String roomId = (String)waitRequest.getMessageBody().get("roomId");
		if (roomId == null) {
			throw new BadRequestException("대기방 정보가 없습니다.");
		} else {
			WaitRoom waitRoom = waitRoomRepository.findByRoomId(roomId)
				.orElseThrow(() -> new NotFoundException("대기방을 찾을 수 없습니다."));
			return waitRoom;
		}
	}

	public void deleteWaiter(String token, String roomId) {
		Member member = jwtTokenProvider.getMember(token);
		WaitRoom waitRoom = waitRoomRepository.findByRoomId(roomId)
			.orElseThrow(() -> new NotFoundException("대기방을 찾을 수 없습니다."));
		Waiter waiter = waiterRepository.findByWaitRoomAndMemberId(waitRoom, member.getId())
			.orElseThrow(() -> new NotFoundException("해당 유저는 대기방에 없습니다."));
		waitRoom.deleteWaiter(waiter);
		waitRoom.minusMemberCount();
		waiterRepository.delete(waiter);
		waitRoomRepository.save(waitRoom);

		// 새로운 대기방 메세지 생성
		Map<String, Object> messageBody = new HashMap<>();
		messageBody.put("roomId", waitRoom.getRoomId());
		messageBody.put("username", member.getUsername());

		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
			.type(WaitMessageDto.MessageType.EXIT)
			.messageBody(messageBody)
			.build();
		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitMessageDto);

	}

	@Transactional
	public WaitRoom createWaiter(String token, String roomId) {
		Member member = jwtTokenProvider.getMember(token);

		WaitRoom waitRoom = waitRoomRepository.findByRoomId(roomId)
			.orElseThrow(() -> new NotFoundException("대기방을 찾을 수 없습니다."));
		if (waiterRepository.existsByWaitRoomAndMemberId(waitRoom, member.getId())) {
			throw new ConflictException("이미 대기방에 존재하는 유저입니다.");
		}
		Waiter waiter = Waiter.builder()
			.memberId(member.getId())
			.nickname(member.getNickname())
			.username(member.getUsername())
			.avgProfit(member.getAvgProfit())
			.profileIcon(member.getProfileIcon())
			.waitRoom(waitRoom).build();

		waiterRepository.save(waiter);
		waitRoom.insertWaiter(waiter);
		waitRoom.plusMemberCount();
		WaitRoom savedWaitRoom = waitRoomRepository.save(waitRoom);

		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> messageBody = mapper.convertValue(waiter, Map.class);
		messageBody.put("roomId", roomId);

		// 방에 있는 사람들에게 뿌려주기
		WaitMessageDto waitMessageDto = WaitMessageDto.builder()
			.type(WaitMessageDto.MessageType.ENTER)
			.messageBody(messageBody)
			.build();
		redisPublisher.publishWaitRoom(redisWaitRepository.getTopic("wait-room"), waitMessageDto);
		return savedWaitRoom;
	}
}
