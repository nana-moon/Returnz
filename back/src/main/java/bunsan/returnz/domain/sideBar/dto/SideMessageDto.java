package bunsan.returnz.domain.sideBar.dto;

import java.io.Serializable;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SideMessageDto implements Serializable {
	public enum MessageType {
		INVITE, STATE, FRIEND, ENTER, EXIT;
	}
	private MessageType type;
	private Map<String, Object> messageBody;
}
