package bunsan.returnz.global.advice.exception;

public class ForbiddenException extends BusinessException {
	private static final String MESSAGE = "허용되지 않은 요청입니다.";

	public ForbiddenException(String message) {
		super(message);
	}
}
