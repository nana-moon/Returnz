package bunsan.returnz.domain.waiting.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {
	private String nickname;
	private String contents;
	private String roomId;
}
