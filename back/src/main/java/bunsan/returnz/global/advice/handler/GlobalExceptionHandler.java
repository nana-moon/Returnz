package bunsan.returnz.global.advice.handler;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import bunsan.returnz.global.advice.enums.ErrorResponse;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.ConflictException;
import bunsan.returnz.global.advice.exception.ForbiddenException;
import bunsan.returnz.global.advice.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleMethodArgumentException(BindingResult bindingResult) {
		String errorMessage = bindingResult.getFieldErrors()
			.get(0)
			.getDefaultMessage();
		return ResponseEntity.badRequest().body(new ErrorResponse(400, errorMessage));
	}

	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	protected ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(
		HttpRequestMethodNotSupportedException e) {
		return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(new ErrorResponse(405, "허용되지 않은 메서드입니다."));
	}

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException e) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(404, e.getMessage()));
	}

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException e) {
		return ResponseEntity.badRequest().body(new ErrorResponse(400, e.getMessage()));
	}

	@ExceptionHandler(ForbiddenException.class)
	public ResponseEntity<ErrorResponse> handleForbiddenException(ForbiddenException e) {
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse(403, e.getMessage()));
	}

	@ExceptionHandler(ConflictException.class)
	public ResponseEntity<ErrorResponse> handleConflictException(ConflictException e) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(409, e.getMessage()));
	}

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException e) {
		return ResponseEntity.internalServerError()
			.body(new ErrorResponse(500, "서버에 알 수 없는 문제가 발생했습니다." + e.getMessage()));
	}

}

