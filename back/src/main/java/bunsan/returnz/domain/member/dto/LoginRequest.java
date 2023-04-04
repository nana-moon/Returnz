package bunsan.returnz.domain.member.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LoginRequest {
	@NotBlank(message = "아이디를 입력해주세요.")
	@Email(message = "아이디가 이메일 형식에 맞지 않습니다.")
	private String username;
	@NotBlank(message = "비밀번호를 입력해주세요.")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,20}$",
		message = "비밀번호는 영문, 숫자, 특수문자(@$!%*#?&) 포함, 6자 이상 20자 이하여야 합니다.")
	@Size(min = 6, max = 20, message = "비밀번호는 6자 이상 20자 이하여야 합니다.")
	private String password;
}
