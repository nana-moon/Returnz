package bunsan.returnz.domain.mainpage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RankDto {
	private String username;
	private String nickname;
	private Double avgProfit;
	private String profileIcon;

}
