package bunsan.returnz.domain.sidebar.api;

import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.sidebar.dto.SideMessageDto;
import bunsan.returnz.domain.sidebar.service.SideBarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// TODO: 2023-03-29 프론트 서버에 맞게 CrossOrigin 변경

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SideBarController {
	private final SideBarService sideBarService;

	//==================================사이드 바 메세지 송신===================================
	@MessageMapping("/side-bar")
	public void sendToSideBar(SideMessageDto sideRequest, @Header("Authorization") String bearerToken) {
		String token = bearerToken.substring(7);

		if (sideRequest.getType().equals(SideMessageDto.MessageType.FRIEND)) {
			sideBarService.sendFriendRequest(sideRequest, token);
		} else if (sideRequest.getType().equals(SideMessageDto.MessageType.ENTER)) {
			sideBarService.sendEnterMessage((String)sideRequest.getMessageBody().get("username"));
		} else if (sideRequest.getType().equals(SideMessageDto.MessageType.INVITE)) {
			sideBarService.sendInviteMessage(sideRequest, token);
		}
	}
}
