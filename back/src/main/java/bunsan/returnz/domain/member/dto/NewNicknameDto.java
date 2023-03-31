package bunsan.returnz.domain.member.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Getter;

@Getter
public class NewNicknameDto {
	@NotBlank(message = "닉네임을 입력해주세요.")
	@Pattern(regexp = "^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$",
		message = "닉네임은 2자 이상 16자 이하, 영어 또는 숫자 또는 한글이어야 합니다.")
	@Size(min = 1, max = 10, message = "닉네임는 1자 이상 10자 이하여야 합니다.")
	private String newNickname;
}
