package bunsan.returnz.domain.game.dto;

import java.time.LocalDateTime;

import bunsan.returnz.domain.game.enums.TurnPerTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class GameRoomDto {
	private Long id;
	private String roomId;
	private Integer curTurn;
	private Integer totalTurn;
	private LocalDateTime curDate;
	private Integer roomMemberCount;
	private TurnPerTime turnPerTime;
}
