package bunsan.returnz.domain.game.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RoomMessageDto {
	private MessageType type;
	private String roomId;
	private Map<String, Object> messageBody;
	public enum MessageType {
		MAKE_GAME, READY, TURN, CHAT, END
	}
}
