package bunsan.returnz.domain.game.util.calendarrange;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class MonthRange {
	private LocalDateTime firstDay;
	private LocalDateTime lastDay;

	public MonthRange(LocalDateTime firstDay, LocalDateTime lastDay) {
		this.firstDay = firstDay;
		this.lastDay = lastDay;
	}

}
