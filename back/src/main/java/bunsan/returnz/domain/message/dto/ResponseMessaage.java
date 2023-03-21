package bunsan.returnz.domain.message.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
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
