package bunsan.returnz.domain.result.service;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.RoomMessageDto;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.infra.redis.service.RedisPublisher;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.repository.RedisResultRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ResultSocketService {

	private final JwtTokenProvider jwtTokenProvider;
	private final RedisPublisher redisPublisher;
	private final RedisResultRoomRepository redisResultRoomRepository;

	public void sendChatMessage(RoomMessageDto roomMessageDto, String token) {
		checkResultRoomId(roomMessageDto);
		Member member = jwtTokenProvider.getMember(token);
		if (roomMessageDto.getMessageBody().get("contents") == null) {
			throw new BadRequestException("대화 내용이 없습니다.");
		}
		roomMessageDto.getMessageBody().put("nickname", member.getNickname());
		redisPublisher.publishGameRoom(redisResultRoomRepository.getTopic("result-room"), roomMessageDto);
	}

	private void checkResultRoomId(RoomMessageDto roomMessageDto) {
		if (roomMessageDto.getRoomId() == null) {
			throw new BadRequestException("결과창 정보를 입력해주세요.");
		}
		// resultRoomRepository.findByRoomId(roomMessageDto.getRoomId())
		// 	.orElseThrow(() -> new BadRequestException("결과창 정보가 올바르지 않습니다."));
	}
}
