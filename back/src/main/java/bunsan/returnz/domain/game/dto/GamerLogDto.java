package bunsan.returnz.domain.game.dto;

import bunsan.returnz.persist.entity.GameRoom;
import bunsan.returnz.persist.entity.Member;
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
public class GamerLogDto {
	private Integer deposit;
	private Integer originDeposit;
	private Integer totalPurchaseAmount;
	private Integer totalEvaluationAsset;
	private Integer totalEvaluationStock;
	private Integer curTurn;
	private Double totalProfitRate;
	private GameRoom gameRoom;
	private Member member;
}
