package bunsan.returnz.domain.game.util.calendar_range;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class WeekRange {
	public LocalDateTime monday;
	public LocalDateTime friday;

	public WeekRange(LocalDateTime monday, LocalDateTime friday) {
		this.monday = monday;
		this.friday = friday;
	}

}