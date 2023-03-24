package bunsan.returnz.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RequestGameInfo {
	private String roomId;
	private int turnCount;
}
