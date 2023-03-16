package bunsan.returnz.domain.message.sevice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.message.dto.ResponseMessaage;

@Service
public class MessageService {
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final NotificationService notificationService;

	@Autowired
	public MessageService(SimpMessagingTemplate simpMessagingTemplate, NotificationService notificationService) {
		this.simpMessagingTemplate = simpMessagingTemplate;
		this.notificationService = notificationService;
	}

	public void notifyFrontend(final String message) {
		ResponseMessaage response = new ResponseMessaage(message);
		notificationService.sendGlobalNotification();
		simpMessagingTemplate.convertAndSend("/topic/messages", response);
	}

	public void notifyUser(final String id, final String message) {
		ResponseMessaage response = new ResponseMessaage(message);
		notificationService.sendPrivateNotification(id);
		simpMessagingTemplate.convertAndSendToUser(id, "/topic/private-messages", response);
	}
}
