package bunsan.returnz.domain.waiting.dto;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

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
		ENTER, CHAT, EXIT, SETTING, @JsonEnumDefaultValue UNKNOWN;
	}
	private MessageType type;
	private Map<String, Object> messageBody;
}
