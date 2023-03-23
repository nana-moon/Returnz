package bunsan.returnz.domain.friend.api;

import org.springframework.stereotype.Controller;

//--------------------------------------테스트용 컨트롤러-------------------------------------------
@Controller
public class MessageController {
//	@Autowired
//	private NotificationService notificationService;
//	@MessageMapping("/message")
//	@SendTo("/topic/messages") // 이 topic을 구독한 유저에게 전달
//	public ResponseMessaage getMessage(final FriendRequestDto friendRequest) throws InterruptedException {
//		Thread.sleep(1000);
//		notificationService.sendGlobalNotification();
//		return new ResponseMessaage(HtmlUtils.htmlEscape(friendRequest.getRequestUsername()));
//	}
//
//	@MessageMapping("/private-message")
//	@SendToUser("/topic/private-messages")
//	public ResponseMessaage getPrivateMessage(final FriendRequestDto friendRequest,
//		final Principal principal) throws InterruptedException {
//		Thread.sleep(1000);
//		notificationService.sendPrivateNotification(principal.getName());
//		return new ResponseMessaage(HtmlUtils.htmlEscape(
//			"Sending private friendRequest" + principal.getName() + ":" + friendRequest.getRequestUsername()));
//	}

}
