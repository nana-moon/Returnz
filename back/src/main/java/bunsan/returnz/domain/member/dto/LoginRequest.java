package bunsan.returnz.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LoginRequest {
	private String username;
	private String password;
}
