package bunsan.returnz.domain.game.util;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import bunsan.returnz.domain.game.util.calendarrange.CalDateRange;
import bunsan.returnz.domain.game.util.calendarrange.MonthRange;
import bunsan.returnz.domain.game.util.calendarrange.WeekRange;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class CalDateRangeTest {
	@Test
	void testCalculateWeekRanges() {
		LocalDateTime startDate = LocalDateTime.of(2023, 3, 29, 0, 0);
		int weeks = 3;

		List<WeekRange> weekRanges = CalDateRange.calculateWeekRanges(startDate, weeks);

		assertEquals(weeks, weekRanges.size());

		assertEquals(LocalDateTime.of(2023, 3, 29, 0, 0), weekRanges.get(0).getWeekFirstDay());
		assertEquals(LocalDateTime.of(2023, 3, 31, 0, 0), weekRanges.get(0).getWeekLastDay());

		assertEquals(LocalDateTime.of(2023, 4, 3, 0, 0), weekRanges.get(1).getWeekFirstDay());
		assertEquals(LocalDateTime.of(2023, 4, 7, 0, 0), weekRanges.get(1).getWeekLastDay());

		assertEquals(LocalDateTime.of(2023, 4, 10, 0, 0), weekRanges.get(2).getWeekFirstDay());
		assertEquals(LocalDateTime.of(2023, 4, 14, 0, 0), weekRanges.get(2).getWeekLastDay());
	}

	@Test
	void testCalculateMonthRanges() {
		LocalDateTime startDate = LocalDateTime.of(2023, 3, 15, 0, 0);
		int months = 5;

		List<MonthRange> monthRanges = CalDateRange.calculateMonthRanges(startDate, months);

		assertEquals(months, monthRanges.size());

		assertEquals(LocalDateTime.of(2023, 3, 15, 0, 0), monthRanges.get(0).getFirstDay());
		assertEquals(LocalDateTime.of(2023, 3, 31, 0, 0), monthRanges.get(0).getLastDay());

		assertEquals(LocalDateTime.of(2023, 4, 1, 0, 0), monthRanges.get(1).getFirstDay());
		assertEquals(LocalDateTime.of(2023, 4, 30, 0, 0), monthRanges.get(1).getLastDay());

		assertEquals(LocalDateTime.of(2023, 5, 1, 0, 0), monthRanges.get(2).getFirstDay());
		assertEquals(LocalDateTime.of(2023, 5, 31, 0, 0), monthRanges.get(2).getLastDay());

		assertEquals(LocalDateTime.of(2023, 6, 1, 0, 0), monthRanges.get(3).getFirstDay());
		assertEquals(LocalDateTime.of(2023, 6, 30, 0, 0), monthRanges.get(3).getLastDay());

		assertEquals(LocalDateTime.of(2023, 6, 1, 0, 0), monthRanges.get(3).getFirstDay());
		assertEquals(LocalDateTime.of(2023, 6, 30, 0, 0), monthRanges.get(3).getLastDay());

		assertEquals(LocalDateTime.of(2023, 7, 1, 0, 0), monthRanges.get(4).getFirstDay());
		assertEquals(LocalDateTime.of(2023, 7, 31, 0, 0), monthRanges.get(4).getLastDay());
	}
}
