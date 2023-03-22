package bunsan.returnz.domain.friend.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ResponseMessaage {

	public String content;
	public ResponseMessaage(String content) {
		this.content = content;
	}

	public ResponseMessaage() {
	}
}
