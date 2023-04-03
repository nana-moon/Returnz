package bunsan.returnz.domain.member.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Getter;

@Getter
public class NewNicknameDto {
	@NotBlank(message = "닉네임을 입력해주세요.")
	@Pattern(regexp = "^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$",
		message = "닉네임은 2자 이상 10자 이하, 영어 또는 숫자 또는 한글이어야 합니다.")
	@Size(min = 2, max = 10, message = "닉네임는 2자 이상 10자 이하여야 합니다.")
	private String newNickname;
}
