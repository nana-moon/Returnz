package bunsan.returnz.domain.message.dto;

import bunsan.returnz.persist.entity.FriendRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class FriendRequestDto {
	public String requestUsername;
	public String targetUsername;

	public FriendRequest toEntity() {
		return FriendRequest.builder()
			.requestUsername(requestUsername)
			.targetUsername(targetUsername)
			.build();
	}

}
