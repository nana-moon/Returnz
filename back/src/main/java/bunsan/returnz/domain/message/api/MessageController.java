package bunsan.returnz.domain.message.api;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import bunsan.returnz.domain.message.dto.Message;
import bunsan.returnz.domain.message.dto.ResponseMessaage;
import bunsan.returnz.domain.message.sevice.NotificationService;

@Controller
public class MessageController {
	@Autowired
	private NotificationService notificationService;
	@MessageMapping("/message")
	@SendTo("/topic/messages")
	public ResponseMessaage getMessage(final Message message) throws InterruptedException {
		Thread.sleep(1000);
		notificationService.sendGlobalNotification();
		return new ResponseMessaage(HtmlUtils.htmlEscape(message.getMessageContent()));
	}

	@MessageMapping("/private-message")
	@SendToUser("/topic/private-messages")
	public ResponseMessaage getPrivateMessage(final Message message,
		final Principal principal) throws InterruptedException {
		Thread.sleep(1000);
		notificationService.sendPrivateNotification(principal.getName());
		return new ResponseMessaage(HtmlUtils.htmlEscape(
			"Sending private message" + principal.getName() + ":" + message.getMessageContent()));
	}

}
