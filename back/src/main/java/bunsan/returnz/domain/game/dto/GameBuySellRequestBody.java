package bunsan.returnz.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class GameBuySellRequestBody {
	private String type;
	private String roomId;
	private Long gamerId;
	private String companyCode;
	private Integer amoount;

}
