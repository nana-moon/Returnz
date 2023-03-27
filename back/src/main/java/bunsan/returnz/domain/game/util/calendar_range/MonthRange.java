package bunsan.returnz.domain.game.util.calendar_range;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class MonthRange {
	public LocalDateTime firstDay;
	public LocalDateTime lastDay;

	public MonthRange(LocalDateTime firstDay, LocalDateTime lastDay) {
		this.firstDay = firstDay;
		this.lastDay = lastDay;
	}

}
