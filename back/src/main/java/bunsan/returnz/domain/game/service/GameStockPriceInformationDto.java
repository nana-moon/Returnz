package bunsan.returnz.domain.game.service;

import bunsan.returnz.domain.game.enums.StockState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GameStockPriceInformationDto {
	Integer historyDate;
	Double historyPrice;
	Double historyDiff;
	StockState historyUpAndDown;
	Long Volume;
}
