package bunsan.returnz.infra.websocket;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import bunsan.returnz.domain.member.enums.MemberState;
import bunsan.returnz.domain.sidebar.service.SideBarService;
import bunsan.returnz.global.advice.exception.NotFoundException;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberRepository memberRepository;
	private SideBarService sideBarService;

	@SneakyThrows
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor headerAccessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
		assert headerAccessor != null;

		if (StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
			String authToken = headerAccessor.getFirstNativeHeader("Authorization").substring(7);
			Authentication authentication = jwtTokenProvider.getAuthentication(authToken);
			headerAccessor.setUser(authentication);
			log.info("online: " + authentication.getName());
		} else if (StompCommand.DISCONNECT.equals(headerAccessor.getCommand())) {
			String username = headerAccessor.getUser().getName();
			log.info("offline: " + username);
			Member member = memberRepository.findByUsername(username)
				.orElseThrow(() -> new NotFoundException("요청 맴버를 찾을 수 없습니다."));
			// sideBarService.checkState(member, MemberState.OFFLINE.getCode()); // 소켓 연결이 끊기면 메세지를 보낼 수 없음
			if (!member.getState().equals(MemberState.OFFLINE)) {
				member.changeState(MemberState.OFFLINE);
				memberRepository.save(member);
			}
		}
		return message;
	}
}
