package bunsan.returnz.domain.game.util.calendarrange;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

/**
 * 시작일로 부터 금요일(영업일) 까지 주별로 월요일 금요일 을 계산하기 위한객체
 * 월 금  리스트를 통해 해당 범위에 데이터가 있는지 체크하기 위해 사용
 */
@Component
public class CalDateRange {
	public static List<WeekRange> calculateWeekRanges(LocalDateTime startDate, int weeks) {
		List<WeekRange> weekRanges = new ArrayList<>();
		LocalDateTime currentMonday = startDate.toLocalDate().atTime(0, 0, 0);
		LocalDateTime currentFriday;

		if (startDate.getDayOfWeek() != DayOfWeek.MONDAY) {
			currentMonday = currentMonday.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
			currentFriday = currentMonday.with(TemporalAdjusters.nextOrSame(DayOfWeek.FRIDAY));
			if (startDate.isAfter(currentFriday)) {
				currentMonday = currentMonday.plusWeeks(1);
			} else {
				weekRanges.add(new WeekRange(startDate, currentFriday));
				weeks--;
				currentMonday = currentMonday.plusWeeks(1);
			}
		}

		for (int i = 0; i < weeks; i++) {
			currentFriday = currentMonday.with(TemporalAdjusters.nextOrSame(DayOfWeek.FRIDAY));
			weekRanges.add(new WeekRange(currentMonday, currentFriday));
			currentMonday = currentMonday.plusWeeks(1);
		}

		return weekRanges;
	}

	public static List<MonthRange> calculateMonthRanges(LocalDateTime startDate, int months) {
		List<MonthRange> monthRanges = new ArrayList<>();
		LocalDateTime currentFirstDay = startDate;
		LocalDateTime currentLastDay;

		if (!startDate.toLocalDate().isEqual(startDate.with(TemporalAdjusters.firstDayOfMonth()).toLocalDate())) {
			currentLastDay = currentFirstDay.with(TemporalAdjusters.lastDayOfMonth());
			monthRanges.add(new MonthRange(currentFirstDay, currentLastDay));
			months--;
			currentFirstDay = currentFirstDay.plusMonths(1).with(TemporalAdjusters.firstDayOfMonth());
		}

		for (int i = 0; i < months; i++) {
			currentLastDay = currentFirstDay.with(TemporalAdjusters.lastDayOfMonth());
			monthRanges.add(new MonthRange(currentFirstDay, currentLastDay));
			currentFirstDay = currentFirstDay.plusMonths(1);
		}

		return monthRanges;
	}

}
