package bunsan.returnz.domain.sideBar.api;

import bunsan.returnz.domain.sideBar.service.SideBarService;
import bunsan.returnz.domain.sideBar.dto.SideMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
@RequiredArgsConstructor
public class SideBarController {
    private final SideBarService sideBarService;

    //==================================사이드 바 메세지 송신===================================
//    @PostMapping("/side-bar")
    @MessageMapping("/side-bar")
    public void sendToSideBar(SideMessageDto sideRequest, @RequestHeader(value = "Authorization") String bearerToken) {
        log.info(sideRequest.getType().toString());
        String token = bearerToken.substring(7);
        log.info("token"+ token);
        // if (sideRequest.getType().equals(SideMessageDto.MessageType.INVITE)) {
        //     sideBarService.sendInviteMessage(sideRequest);
        // } else if (sideRequest.getType().equals(SideMessageDto.MessageType.FRIEND)) {
        //     sideBarService.sendFriendRequest(sideRequest);
        // }
        if (sideRequest.getType().equals("INVITE")) {
            sideBarService.sendInviteMessage(sideRequest);
        } else if (sideRequest.getType().equals("FRIEND")) {
            sideBarService.sendFriendRequest(sideRequest);
        }
    }
}
