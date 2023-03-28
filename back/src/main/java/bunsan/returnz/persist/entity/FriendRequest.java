package bunsan.returnz.persist.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import bunsan.returnz.domain.friend.dto.FriendRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String requestUsername;
	private String targetUsername;

	public FriendRequestDto toDto(Member requester) {
		return FriendRequestDto.builder()
			.requestId(this.id)
			.username(requester.getUsername())
			.nickname(requester.getNickname())
			.profileIcon(requester.getProfileIcon().getCode())
			.build();
	}
}
