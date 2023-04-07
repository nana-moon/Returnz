package bunsan.returnz.infra.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import lombok.RequiredArgsConstructor;

// TODO: 2023-03-29 프론트 서버에 맞게 CrossOrigin 변경 또는 삭제

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WebSockConfig implements WebSocketMessageBrokerConfigurer {
	private final StompHandler stompHandler;

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		registry.enableSimpleBroker("/sub");
		registry.setApplicationDestinationPrefixes("/pub");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// TODO: 2023-04-07 프론트 주소로 바꾸기
		registry.addEndpoint("/ws").setAllowedOriginPatterns("*")
			.withSockJS();
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration registration) {
		registration.interceptors(stompHandler);
	}

}
