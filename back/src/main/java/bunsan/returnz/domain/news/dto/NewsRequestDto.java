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


	private Long id;

	private String companyCode;

	private LocalDateTime articleDateTime;



}
