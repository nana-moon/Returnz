package bunsan.returnz.infra.websocket;

import java.util.Objects;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import bunsan.returnz.global.auth.service.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
	private final JwtTokenProvider jwtTokenProvider;
	@SneakyThrows
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor headerAccessor  = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
		assert headerAccessor != null;
		// log.info("message:" + message);
		// log.info("header:" + message.getHeaders());
		// log.info("token:" + accessor.getNativeHeader("Authorization"));
		if (StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
			String token = String.valueOf(headerAccessor.getNativeHeader("Authorization").get(0));
			log.info(token);
			// jwtTokenProvider.validateToken(Objects.requireNonNull(
			String authToken = headerAccessor.getFirstNativeHeader("Authorization").substring(7);
			log.info(authToken);
			Authentication authentication = jwtTokenProvider.getAuthentication(authToken);
			headerAccessor.setUser(authentication);
		}
		return message;
	}
}
