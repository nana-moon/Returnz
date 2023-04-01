package bunsan.returnz.domain.member.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Getter;

@Getter
public class NewProfileDto {
	@NotBlank(message = "새 프로필 정보를 입력해주세요.")
	@Pattern(regexp = "^[A-L]{1,1}$",
		message = "프로필은 A-L 중 하나여야 합니다.")
	private String newProfile;
}
