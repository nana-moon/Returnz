package bunsan.returnz.domain.sideBar.api;

import bunsan.returnz.domain.sideBar.service.SideBarService;
import bunsan.returnz.domain.sideBar.dto.SideMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SideBarController {
    private final SideBarService sideBarService;

    //==================================사이드 바 메세지 송신===================================
//    @PostMapping("/side-bar")
    @MessageMapping("/side-bar")
    public void sendToSideBar(SideMessageDto sideRequest, @RequestHeader(value = "Authorization") String bearerToken) {
        String token = bearerToken.substring(7);
        if (sideRequest.getType().equals(SideMessageDto.MessageType.INVITE)) {
            sideBarService.sendInviteMessage(sideRequest, token);
        } else if (sideRequest.getType().equals(SideMessageDto.MessageType.FRIEND)) {
            sideBarService.sendFriendRequest(sideRequest, token);
        }
    }
}
