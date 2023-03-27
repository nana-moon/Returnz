package bunsan.returnz.domain.mainpage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodayWordDto {
	public String keyWord;
	public String description;
}
