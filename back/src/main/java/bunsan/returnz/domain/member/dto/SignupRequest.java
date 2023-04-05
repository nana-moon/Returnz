package bunsan.returnz.domain.member.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import bunsan.returnz.persist.entity.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignupRequest {
	@NotBlank(message = "아이디를 입력해주세요.")
	@Email(message = "아이디가 이메일 형식에 맞지 않습니다.")
	private String username;

	@NotBlank(message = "비밀번호를 입력해주세요.")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,20}$",
		message = "비밀번호는 영문, 숫자, 특수문자(@$!%*#?&) 포함, 6자 이상 20자 이하여야 합니다.")
	@Size(min = 6, max = 20, message = "비밀번호는 6자 이상 20자 이하여야 합니다.")
	private String password;

	@NotBlank(message = "비밀번호 확인을 입력해주세요.")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,20}$",
		message = "비밀번호 확인은 영문, 숫자, 특수문자(@$!%*#?&) 포함, 6자 이상 20자 이하여야 합니다.")
	@Size(min = 6, max = 20, message = "비밀번호 확인은 6자 이상 20자 이하여야 합니다.")
	private String passwordConfirmation;

	@NotBlank(message = "닉네임을 입력해주세요.")
	@Pattern(regexp = "^(?=.*[A-Za-z0-9가-힣])[A-Za-z0-9가-힣]{2,10}$",
		message = "닉네임은 2자 이상 10자 이하, 영어 또는 숫자 또는 한글이어야 합니다.")
	@Size(min = 2, max = 10, message = "닉네임는 2자 이상 10자 이하여야 합니다.")
	private String nickname;

	public Member toEntity() {
		return Member.builder()
			.username(username)
			.password(password)
			.nickname(nickname)
			.build();
	}
}
