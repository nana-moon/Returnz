package bunsan.returnz.domain.friend.dto;

import bunsan.returnz.domain.member.enums.ProfileIcon;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequestDto {
	public Long requestId;
	public String username;
	public String nickname;
	public String profileIcon;

}
