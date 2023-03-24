package bunsan.returnz.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class GameGamerDto {
	private Long gamerId;
	private String userName;
	private Integer deposit;
	private Integer totalBuyAmoount;
	private Integer totalEvaluationAmount;
}
