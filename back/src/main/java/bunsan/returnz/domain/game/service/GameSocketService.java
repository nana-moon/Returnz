package bunsan.returnz.domain.game.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

import javax.transaction.Transactional;
import javax.validation.constraints.NotBlank;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.RoomMessageDto;
import bunsan.returnz.domain.member.enums.MemberState;
import bunsan.returnz.domain.sidebar.service.SideBarService;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.NotFoundException;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.infra.redis.service.RedisPublisher;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.repository.GameRoomRepository;
import bunsan.returnz.persist.repository.MemberRepository;
import bunsan.returnz.persist.repository.RedisGameRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameSocketService {
	private final RedisPublisher redisPublisher;
	private final GameRoomRepository gameRoomRepository;
	private final MemberRepository memberRepository;
	private final RedisGameRoomRepository redisGameRoomRepository;
	private final SideBarService sideBarService;
	private final JwtTokenProvider jwtTokenProvider;

	@Transactional
	public void sendEnterMessage(RoomMessageDto roomMessageDto, String token) {
		// 유효한 게임방 정보인지 체크
		checkGameRoomId(roomMessageDto);
		// username 유효한지 체크
		Member member = jwtTokenProvider.getMember(token);
		// 상태 확인 후 다를 경우 change
		sideBarService.checkState(member, MemberState.BUSY);
		// 그대로 돌려주기
		redisPublisher.publishGameRoom(redisGameRoomRepository.getTopic("game-room"), roomMessageDto);
	}

	private void checkGameRoomId(RoomMessageDto roomMessageDto) {
		gameRoomRepository.findByRoomId(roomMessageDto.getRoomId())
			.orElseThrow(() -> new BadRequestException("게임룸 정보가 올바르지 않습니다."));
	}

	public void sendReadyMessage(RoomMessageDto roomMessageDto, String token) {
		checkGameRoomId(roomMessageDto);
		Member member = jwtTokenProvider.getMember(token);
		roomMessageDto.getMessageBody().put("username", member.getUsername());
		redisPublisher.publishGameRoom(redisGameRoomRepository.getTopic("game-room"), roomMessageDto);
	}

	public void sendChatMessage(RoomMessageDto roomMessageDto, String token) {
		checkGameRoomId(roomMessageDto);
		Member member = jwtTokenProvider.getMember(token);
		if (roomMessageDto.getMessageBody().get("contents") == null) {
			throw new BadRequestException("대화 내용이 없습니다.");
		}
		roomMessageDto.getMessageBody().put("nickname", member.getNickname());
		redisPublisher.publishGameRoom(redisGameRoomRepository.getTopic("game-room"), roomMessageDto);
	}

	public String sendServerTime(String roomId) {
		// log.info("111");
		gameRoomRepository.findByRoomId(roomId)
			.orElseThrow(() -> new NotFoundException("해당 게임룸을 찾을 수 없습니다."));

		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		DateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");

		cal.add(Calendar.MINUTE, 2);

		RoomMessageDto roomMessageDto = RoomMessageDto.builder()
			.type(RoomMessageDto.MessageType.TIME)
			.roomId(roomId)
			.messageBody(new HashMap<>() {
				{
					put("returnTime", df.format(cal.getTime()));
				}
			})
			.build();
		redisPublisher.publishGameRoom(redisGameRoomRepository.getTopic("game-room"), roomMessageDto);
		return df.format(cal.getTime());

	}
}
