package bunsan.returnz.domain.game.enums;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import bunsan.returnz.domain.game.dto.RequestSettingGame;
import bunsan.returnz.global.advice.exception.BadRequestException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public enum Theme {
	COVID("COVID"),
	DOTCOM("DOTCOM"),
	USER("USER"),
	LAST_YEAR("LAST_YEAR"),
	LAST_MONTH("LAST_MONTH");

	private final String theme;

	Theme(String theme) {
		this.theme = theme;
	}

	public static boolean isValid(Theme value) {
		try {
			Theme.valueOf(String.valueOf(value));
			return true;
		} catch (IllegalArgumentException e) {
			return false;
		}
	}

	public String getTheme() {
		return theme;
	}

	// TODO: 2023/03/23 이거 디티오에 있어야하는거 같은데요?
}
