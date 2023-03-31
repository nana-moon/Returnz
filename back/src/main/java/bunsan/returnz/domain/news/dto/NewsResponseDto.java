package bunsan.returnz.domain.news.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import bunsan.returnz.global.advice.exception.BadRequestException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NewsResponseDto {
	private Boolean isExist;
	private String title;
	private String summary;
	private String articleUrl;

	@JsonIgnore
	public Boolean isValid() {
		if (isExist) {
			return title != null && summary != null && articleUrl != null;
		} else {
			return title == null && summary == null && articleUrl == null;
		}
	}

}
