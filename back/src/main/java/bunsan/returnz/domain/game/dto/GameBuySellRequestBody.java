package bunsan.returnz.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ToString
public class GameBuySellRequestBody {
	private String roomId;
	private Long gamerId;
	private String companyCode;
	private Integer count;

}
