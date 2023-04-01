package bunsan.returnz.domain.friend.dto;

import bunsan.returnz.domain.member.enums.MemberState;
import bunsan.returnz.domain.member.enums.ProfileIcon;
import bunsan.returnz.persist.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FriendInfo {
	public String username;
	public String nickname;
	public MemberState state;
	public String profileIcon;
	public FriendInfo(Member member) {
		this.username = member.getUsername();
		this.nickname = member.getNickname();
		this.state = member.getState();
		this.profileIcon = member.getProfileIcon();
	}

}
