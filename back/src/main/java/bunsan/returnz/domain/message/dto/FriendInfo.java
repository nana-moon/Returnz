package bunsan.returnz.domain.message.dto;

import bunsan.returnz.domain.member.enums.MemberState;
import bunsan.returnz.persist.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor
public class FriendInfo {
	public Long id;
	public String username;
	public String nickname;
	public MemberState state;
	public FriendInfo(Member member) {
		this.id = member.getId();
		this.username = member.getUsername();
		this.nickname = member.getNickname();
		this.state = member.getState();
	}

}
