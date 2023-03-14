package bunsan.returnz.global.advice.exception;

public class ConflictException extends BusinessException {
	private static final String MESSAGE = "리소스 충돌이 일어났습니다.";
	public ConflictException(String message) {
		super(message);
	}
}
