package bunsan.returnz.domain.result.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GamerLogResponseDto {
	private Integer deposit;
	private Integer originDeposit;
	private Integer totalPurchaseAmount;
	private Integer totalEvaluationAsset;
	private Integer totalEvaluationStock;
	private Integer curTurn;
	private Double totalProfitRate;
	private String userName;
	private String userNickName;
	private Long memberId;
	private String profileIcon;
}
