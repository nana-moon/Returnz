package bunsan.returnz.domain.message.api;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.message.dto.Message;
import bunsan.returnz.domain.message.sevice.MessageService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WsController {
	private final MessageService messageService;

	@PostMapping("/send-message")
	public void sendMessage(@RequestBody final Message message) {
		messageService.notifyFrontend(message.getMessageContent());

	}

	@PostMapping("/send-private-message/{id}")
	public void sendPrivateMessage(@PathVariable final String id, @RequestBody final Message message) {
		messageService.notifyUser(id, message.getMessageContent());

	}

}
