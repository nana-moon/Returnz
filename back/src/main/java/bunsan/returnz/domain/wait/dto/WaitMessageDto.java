package bunsan.returnz.domain.wait.dto;

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
public class WaitMessageDto {
	public enum MessageType {
		ENTER, CHAT, EXIT;
	}
	private MessageType type;
	private Map<String, Object> messageBody;
}
