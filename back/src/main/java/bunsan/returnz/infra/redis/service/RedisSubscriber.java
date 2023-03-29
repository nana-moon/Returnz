package bunsan.returnz.infra.redis.service;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import bunsan.returnz.domain.sidebar.dto.SideMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {
	private final ObjectMapper objectMapper;
	private final RedisTemplate redisTemplate;
	private final SimpMessageSendingOperations messagingTemplate;

	@Override
	public void onMessage(Message message, byte[] pattern) {
		try {
			String topic = (String)redisTemplate.getStringSerializer().deserialize(message.getChannel());
			String publishMessage = (String)redisTemplate.getStringSerializer().deserialize(message.getBody());

			if (topic.equals("side-bar")) {
				log.info("side-bar");
				SideMessageDto sideMessageDto = objectMapper.readValue(publishMessage, SideMessageDto.class);
				messagingTemplate.convertAndSendToUser((String)sideMessageDto.getMessageBody().get("username"),
					"/sub/side-bar", sideMessageDto);
			}
			// else if (topic.equals("likes")){
			// 	LikeResponse likeResponse = objectMapper.readValue(publishMessage, LikeResponse.class);
			// 	messagingTemplate.convertAndSend("/sub/title-hakwon/comments/likes", likeResponse);
			// }else{
			// 	ChatMessageDto roomMessage = objectMapper.readValue(publishMessage, ChatMessageDto.class);
			// 	messagingTemplate.convertAndSend("/sub/chat/room/" + roomMessage.getRoomId(), roomMessage);
			// }

		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}
}
