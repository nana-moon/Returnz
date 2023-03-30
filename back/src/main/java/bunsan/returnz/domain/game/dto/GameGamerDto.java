package bunsan.returnz.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GameGamerDto {
	private Long gamerId;
	private Long mermberId;
	private String userName;
	private String userProfileIcon;
	private Integer deposit;
	private Integer originDeposit;
	private Integer totalPurchaseAmount;
	private Integer totalEvaluationAsset;
	private Integer totalEvaluationStock;
	private Double totalProfitRate;
}
