package bunsan.returnz.global.advice.enums;

import lombok.Getter;

@Getter
public class ErrorResponse {
	private final int status;
	private final String message;

	public ErrorResponse(int status, String message) {
		this.status = status;
		this.message = message;
	}

}
