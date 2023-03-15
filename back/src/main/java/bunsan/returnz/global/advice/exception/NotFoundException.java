package bunsan.returnz.global.advice.exception;

public class NotFoundException extends BusinessException {
	private static final String MESSAGE = "리소스를 찾을 수 없습니다.";

	public NotFoundException(String message) {
		super(message);
	}
}
