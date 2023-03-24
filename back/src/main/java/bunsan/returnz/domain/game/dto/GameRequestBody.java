package bunsan.returnz.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class GameRequestBody {
	private String roomId;
	private Long gamerId;
}
