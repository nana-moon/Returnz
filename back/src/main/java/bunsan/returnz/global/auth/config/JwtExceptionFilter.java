package bunsan.returnz.global.auth.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import bunsan.returnz.global.advice.enums.ErrorResponse;
import io.jsonwebtoken.JwtException;

@Component
public class JwtExceptionFilter extends OncePerRequestFilter {
	private ObjectMapper objectMapper = new ObjectMapper();

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		try {
			filterChain.doFilter(request, response); // go to 'JwtAuthenticationFilter'
		} catch (JwtException ex) {
			setErrorResponse(HttpStatus.UNAUTHORIZED, response, ex);
		}

	}

	public void setErrorResponse(HttpStatus status, HttpServletResponse res, Throwable ex) throws IOException {
		res.setStatus(status.value());
		res.setContentType("application/json; charset=UTF-8");

		ErrorResponse errorResponse = new ErrorResponse(401, "token이 올바르지 않습니다.");
		res.getWriter().write(objectMapper.writeValueAsString(errorResponse));
	}
}
