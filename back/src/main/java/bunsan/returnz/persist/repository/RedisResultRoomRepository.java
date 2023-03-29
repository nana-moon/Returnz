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
public class RedisResultRoomRepository {
	private final RedisMessageListenerContainer redisMessageListener;
	private final RedisSubscriber redisSubscriber;
	private Map<String, ChannelTopic> roomTopics;

	@PostConstruct
	private void init() {
		roomTopics = new HashMap<>();
		roomTopics.put("result-room", new ChannelTopic("result-room"));
		redisMessageListener.addMessageListener(redisSubscriber, roomTopics.get("result-room"));
	}
	// public void createTopic(String roomId) {
	// 	roomTopics.put(roomId, new ChannelTopic(roomId));
	// 	redisMessageListener.addMessageListener(redisSubscriber, roomTopics.get(roomId));
	// }

	public ChannelTopic getTopic(String topic) {
		return roomTopics.get(topic);
	}
}
