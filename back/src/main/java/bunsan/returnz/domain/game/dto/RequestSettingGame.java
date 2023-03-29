package bunsan.returnz.domain.game.dto;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import bunsan.returnz.domain.game.enums.Theme;
import bunsan.returnz.domain.game.enums.TurnPerTime;
import bunsan.returnz.global.advice.exception.BadRequestException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import reactor.util.annotation.Nullable;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestSettingGame {
	@NotNull
	private Theme theme;
	//---- 사용자 설정일때만 아래 값을 사용합니다 -----
	@NotNull
	private TurnPerTime turnPerTime;
	@DateTimeFormat(pattern = "yyyy-MM-dd") // 이 양식은 널러블 합니다.
	private LocalDate startTime;
	@Nullable
	private Integer totalTurn;
	private List<Long> memberIdList;

	public void validateRequestSettingGame() {

		if (this.theme.getTheme().equals("USER")) {
			// 세게중 하나라도 널이면 안된다.
			if (this.totalTurn == null
				|| this.startTime == null
				|| this.turnPerTime == null
			) {
				throw new BadRequestException("사용자 태마는 총턴수, 시작 일,시, 턴당 시간 을 지정하세요");
			}
			// 시작일로 부터 현재까지 남은 턴수
			long weekBetweenTurn = ChronoUnit.WEEKS.between(this.startTime, LocalDateTime.now());
			long monthsBetweenTurn = ChronoUnit.MONTHS.between(this.startTime, LocalDateTime.now());
			long daysBetweenTurn = ChronoUnit.DAYS.between(this.startTime, LocalDateTime.now());
			if (this.turnPerTime.getTime().equals("DAY")
				&& this.totalTurn > daysBetweenTurn) {
				throw new BadRequestException("시작일수로 부터 가능한 일 이 더 작습니다. 계산된 일 " + daysBetweenTurn);
			}
			if (this.turnPerTime.getTime().equals("WEEK")
				&& this.totalTurn > weekBetweenTurn) {
				throw new BadRequestException("시작일수로 부터 가능한 주 가 더 작습니다. 계산된 주 " + weekBetweenTurn);
			}
			if (this.turnPerTime.getTime().equals("MONTH")
				&& this.totalTurn > monthsBetweenTurn) {
				throw new BadRequestException("시작일수로 부터 가능한 달 이 더 작습니다. 계산된 달 " + monthsBetweenTurn);
			}
		}
	}

	public LocalDateTime convertThemeStartDateTime() {
		if (this.theme.getTheme().equals("COVID")) {
			return LocalDateTime.of(2019, 12, 31, 0, 0, 0);
		}
		if (this.theme.getTheme().equals("DOTCOM")) {
			return LocalDateTime.of(1997, 1, 1, 0, 0, 0);
		}
		if (this.theme.getTheme().equals("RIEMANN")) {
			return LocalDateTime.of(2008, 1, 1, 0, 0, 0);
		}
		if (this.theme.getTheme().equals("LAST_YEAR")) {
			LocalDateTime oneYearAgo = LocalDateTime.now().minusYears(1);
			// 주말을 건너뛰기 위한 로직
			if (oneYearAgo.getDayOfWeek() == DayOfWeek.SATURDAY) {
				oneYearAgo = oneYearAgo.minusDays(1);
			} else if (oneYearAgo.getDayOfWeek() == DayOfWeek.SUNDAY) {
				oneYearAgo = oneYearAgo.minusDays(2);
			}
			return oneYearAgo;
		}
		if (this.theme.getTheme().equals("LAST_MONTH")) {
			LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
			if (oneMonthAgo.getDayOfWeek() == DayOfWeek.SATURDAY) {
				oneMonthAgo = oneMonthAgo.minusDays(1);
			} else if (oneMonthAgo.getDayOfWeek() == DayOfWeek.SUNDAY) {
				oneMonthAgo = oneMonthAgo.minusDays(2);
			}
			return oneMonthAgo;
		}
		return this.startTime.atStartOfDay();
	}

	public TurnPerTime getTunPerTime() {
		if (this.theme != Theme.USER)
			return TurnPerTime.DAY;
		return this.turnPerTime;
	}

	public Integer setThemeTotalTurnTime() {
		if (this.theme.getTheme().equals("COVID")) {
			this.totalTurn = 30;
		}
		if (this.theme.getTheme().equals("DOTCOM")) {
			this.totalTurn = 30;
		}
		if (this.theme.getTheme().equals("RIEMANN")) {
			this.totalTurn = 30;
		}
		if (this.theme.getTheme().equals("LAST_YEAR")) {
			this.totalTurn = 30;
		}
		if (this.theme.getTheme().equals("LAST_MONTH")) {
			this.totalTurn = 30;
		}
		return this.totalTurn;
	}

}
