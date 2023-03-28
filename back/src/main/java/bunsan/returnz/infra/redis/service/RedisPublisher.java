package bunsan.returnz.infra.redis.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.sidebar.dto.SideMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class RedisPublisher {
	private final RedisTemplate<String, Object> redisTemplate;

	public void publishSideBar(ChannelTopic topic, SideMessageDto sideMessageDto) {
		log.info("[publishSideBar]"+ topic.getTopic());
		redisTemplate.convertAndSend(topic.getTopic(), sideMessageDto);
	}
}
