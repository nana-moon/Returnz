package bunsan.returnz.domain.game.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GameSettings extends RequestSettingGame {
	private LocalDateTime startDateTime;
	public GameSettings(RequestSettingGame request) {
		super();
		this.setTheme(request.getTheme());
		this.setTurnPerTime(request.getTurnPerTime());
		this.setStartTime(request.getStartTime());
		this.startDateTime = request.convertThemeStartDateTime();
		this.setTotalTurn(request.getTotalTurn());
		this.setMemberIdList(request.getMemberIdList());
	}
}
