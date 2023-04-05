package bunsan.returnz.domain.sidebar.dto;

import java.io.Serializable;
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
public class SideMessageDto implements Serializable {
	private MessageType type;
	private Map<String, Object> messageBody;

	public enum MessageType {
		INVITE, STATE, FRIEND, ENTER, EXIT, @JsonEnumDefaultValue UNKNOWN;
	}
}
