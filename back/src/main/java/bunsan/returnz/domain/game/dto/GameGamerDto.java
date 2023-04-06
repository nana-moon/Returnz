package bunsan.returnz.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class GameGamerDto {
	private Long gamerId;
	private Long memberId;
	private String nickname;
	private String userName;
	private String userProfileIcon;
	private Integer rank;
	private Integer deposit;        // 예치금
	private Integer originDeposit;        // 원본 예치금
	private Integer totalPurchaseAmount;    // 총 구매한 가격
	private Integer totalEvaluationAsset;    // 총 평가 자산
	private Integer totalEvaluationStock;    // 총 주식 평가 금액
	private Double totalProfitRate;    // 총 수익률
}
