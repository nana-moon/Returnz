package bunsan.returnz.infra.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;
import org.springframework.web.bind.annotation.CrossOrigin;
@Configuration
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SecurityWebSocketConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer {
	@Override
	protected void configureInbound(MessageSecurityMetadataSourceRegistry message) {
		message
			.nullDestMatcher().permitAll()
			.simpDestMatchers("/pub/**").authenticated()
			.simpSubscribeDestMatchers("/sub/**").authenticated()
			.simpSubscribeDestMatchers("/user/sub/**").authenticated()
			.anyMessage().denyAll();
	}

	@Override
	protected boolean sameOriginDisabled() {
		return true;
	}

}
