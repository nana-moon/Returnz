package bunsan.returnz.domain.news.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NewsRequestDto {
	@NotNull
	private Long id;
	@NotNull
	private String companyCode;
	@NotNull
	private LocalDateTime articleDateTime;



}
