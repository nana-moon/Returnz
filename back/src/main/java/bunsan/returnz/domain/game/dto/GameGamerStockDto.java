package bunsan.returnz.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GameGamerStockDto {

	private Long id;
	private String companyCode;
	private Integer totalCount;
	private Integer totalAmount;
	private Long gamerId;

	// public GamerStock toEntity(GameGamerStockDto){
	// 	return GamerStock.builder()
	//
	// 		.build();
	// }
}
