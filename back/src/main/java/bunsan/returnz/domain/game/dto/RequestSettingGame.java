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
import lombok.extern.slf4j.Slf4j;
import reactor.util.annotation.Nullable;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
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
			LocalDateTime startDay = LocalDateTime.of(2020, 1, 2, 0, 0, 0);
			this.startTime = LocalDate.from(startDay);
			log.info("check in gameSetting startTime in covid : " + this.startTime);
			return startDay;
		}
		if (this.theme.getTheme().equals("DOTCOM")) {
			LocalDateTime startDay = LocalDateTime.of(1997, 1, 2, 0, 0, 0);
			this.startTime = LocalDate.from(startDay);
			return startDay;
		}
		if (this.theme.getTheme().equals("RIEMANN")) {
			LocalDateTime startDay = LocalDateTime.of(2008, 1, 2, 0, 0, 0);
			this.startTime = LocalDate.from(startDay);
			return startDay;
		}
		if (this.theme.getTheme().equals("LAST_YEAR")) {
			LocalDateTime oneYearAgo = LocalDateTime.now().minusYears(1);
			// 주말임을 검사하고 맞으면  건너뛰기 위한 로직
			return jumpWeek(oneYearAgo);
		}
		if (this.theme.getTheme().equals("LAST_MONTH")) {
			LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
			return jumpWeek(oneMonthAgo);
		}
		return this.startTime.atStartOfDay();
	}

	private LocalDateTime jumpWeek(LocalDateTime inputDateTime) {
		if (inputDateTime.getDayOfWeek() == DayOfWeek.SATURDAY) {
			// 토요일이면 하루 빼고
			inputDateTime = inputDateTime.minusDays(1);
		} else if (inputDateTime.getDayOfWeek() == DayOfWeek.SUNDAY) {
			// 일요일이면 이틀 뺀다
			inputDateTime = inputDateTime.minusDays(2);
		}
		this.startTime = LocalDate.from(inputDateTime);
		return LocalDateTime.of(
			inputDateTime.getYear(),
			inputDateTime.getMonthValue(),
			inputDateTime.getDayOfMonth(),
			0, 0, 0
		);
	}

	public TurnPerTime setThemTurnPerTime() {

		if (this.theme.equals(Theme.LAST_MONTH) || this.theme.equals(Theme.LAST_YEAR)) {
			this.turnPerTime = TurnPerTime.DAY;
			return TurnPerTime.DAY;
		} else if (!this.theme.equals(Theme.USER)) {
			this.turnPerTime = TurnPerTime.WEEK;
			return TurnPerTime.WEEK;
		} else {
			return this.turnPerTime;
		}
	}

	public Integer setThemeTotalTurnTime() {
		if (this.theme.getTheme().equals("COVID")) {
			this.totalTurn = 5;
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
			this.totalTurn = 10;
		}
		return this.totalTurn;
	}

}
