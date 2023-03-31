package bunsan.returnz.persist.repository;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import bunsan.returnz.infra.redis.service.RedisSubscriber;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class RedisWaitRepository {
	private final RedisMessageListenerContainer redisMessageListener;
	private final RedisSubscriber redisSubscriber;
	private Map<String, ChannelTopic> roomTopics;

	@PostConstruct
	private void init() {
		roomTopics = new HashMap<>();
		roomTopics.put("wait-room", new ChannelTopic("wait-room"));
		redisMessageListener.addMessageListener(redisSubscriber, roomTopics.get("wait-room"));
	}

	public ChannelTopic getTopic(String topic) {
		return roomTopics.get(topic);
	}

}
