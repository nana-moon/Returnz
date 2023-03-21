package bunsan.returnz.domain.message.sevice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.message.dto.ResponseMessaage;

//---------------------------------------테스트용 서비스-----------------------------------------
@Service
public class NotificationService {
	private final SimpMessagingTemplate simpMessagingTemplate;

	@Autowired
	public NotificationService(SimpMessagingTemplate simpMessagingTemplate) {
		this.simpMessagingTemplate = simpMessagingTemplate;
	}

	public void sendGlobalNotification() {
		ResponseMessaage messaage = new ResponseMessaage("Global Notification");
		simpMessagingTemplate.convertAndSend("/topic/global-notifications", messaage);
	}

	public void sendPrivateNotification(final String userId) {
		ResponseMessaage messaage = new ResponseMessaage("Private Notification");
		simpMessagingTemplate.convertAndSendToUser(userId, "/topic/private-notifications", messaage);
	}
}
