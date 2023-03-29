package bunsan.returnz.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class GameGamerStockDto {

	private Long id;
	private Long gamerId;
	private String companyCode;
	private Integer totalCount; // 보유 수
	private Integer totalAmount; // 총 가격
	private Double averagePrice; // 평균 단가
	private Double valuation; // 평가손익
	private Double profitRate; // 손익비율

	// public GamerStock toEntity(GameGamerStockDto){
	// 	return GamerStock.builder()
	//
	// 		.build();
	// }
}
