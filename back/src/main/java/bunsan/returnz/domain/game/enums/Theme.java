package bunsan.returnz.domain.game.enums;

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

}
