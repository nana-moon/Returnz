package bunsan.returnz.domain.game.service;

import bunsan.returnz.domain.game.dto.GameSettings;
import bunsan.returnz.domain.game.dto.RequestSettingGame;
import bunsan.returnz.domain.game.enums.Theme;
import bunsan.returnz.domain.game.enums.TurnPerTime;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.persist.repository.HistoricalPriceDayRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

public class GameStartServiceTest {
	@InjectMocks
	private GameStartService gameSettingsService;

	@Mock
	private HistoricalPriceDayRepository historicalPriceDayRepository;

	private GameSettings gameSettings;
	private List<String> gameStockIds;

	// 통과 되면 안되는 데이터
	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
		List<Long> member = new ArrayList<>();
		member.add(1L);
		member.add(2L);
		member.add(3L);
		gameSettings = createGameSettings();
		gameStockIds = Arrays.asList("377190.KS", "095570.KS", "033780.KS");
	}
	// 예외발생하는지 확인하는 테스튼
	@Test
	public void testCheckDayRange_StartDayIsInvalid() {
		when(historicalPriceDayRepository.getDayStock(
			gameSettings.getStartDateTime(), gameStockIds, (long)gameStockIds.size()))
			.thenReturn(false);

		assertThrows(BadRequestException.class, () -> gameSettingsService.checkDayRange(gameSettings, gameStockIds));
	}

	private GameSettings createGameSettings() {
		RequestSettingGame request = new RequestSettingGame();
		request.setTheme(Theme.USER);
		request.setTurnPerTime(TurnPerTime.DAY);
		request.setStartTime(LocalDate.of(2019, 12, 31));
		request.setTotalTurn(31);
		request.setMemberIdList(Arrays.asList(1L, 2L, 3L, 3L));
		return new GameSettings(request);
	}

}
