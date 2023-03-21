package bunsan.returnz.domain.message.api;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import bunsan.returnz.domain.message.dto.FriendRequestDto;
import bunsan.returnz.domain.message.dto.ResponseMessaage;
import bunsan.returnz.domain.message.sevice.NotificationService;

//--------------------------------------테스트용 컨트롤러-------------------------------------------
@Controller
public class MessageController {
	@Autowired
	private NotificationService notificationService;
	@MessageMapping("/message")
	@SendTo("/topic/messages") // 이 topic을 구독한 유저에게 전달
	public ResponseMessaage getMessage(final FriendRequestDto friendRequest) throws InterruptedException {
		Thread.sleep(1000);
		notificationService.sendGlobalNotification();
		return new ResponseMessaage(HtmlUtils.htmlEscape(friendRequest.getRequestUsername()));
	}

	@MessageMapping("/private-message")
	@SendToUser("/topic/private-messages")
	public ResponseMessaage getPrivateMessage(final FriendRequestDto friendRequest,
		final Principal principal) throws InterruptedException {
		Thread.sleep(1000);
		notificationService.sendPrivateNotification(principal.getName());
		return new ResponseMessaage(HtmlUtils.htmlEscape(
			"Sending private friendRequest" + principal.getName() + ":" + friendRequest.getRequestUsername()));
	}

}
