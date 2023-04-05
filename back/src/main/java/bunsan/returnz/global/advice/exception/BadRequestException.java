package bunsan.returnz.global.advice.exception;

public class BadRequestException extends BusinessException {
	private static final String MESSAGE = "잘못된 요청입니다.";

	public BadRequestException(String message) {
		super(message);
	}
}

