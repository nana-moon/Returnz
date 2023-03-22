package bunsan.returnz.domain.friend.dto;

import bunsan.returnz.domain.member.enums.ProfileIcon;
import bunsan.returnz.persist.entity.FriendRequest;
import bunsan.returnz.persist.entity.Member;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequestDto {
	public Long requestId;
	public String username;
	public String nickname;
	public ProfileIcon profileIcon;

}
