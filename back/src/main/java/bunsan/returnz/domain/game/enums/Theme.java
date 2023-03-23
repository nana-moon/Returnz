package bunsan.returnz.domain.game.enums;

public enum Theme {
	COVID("COVID"),
	DOTCOM("DOTCOM"),
	USER("USER"),
	LAST_YEAR("LAST_YEAR"),
	LAST_MONTH("LAST_MONTH");

	private String theme;

	Theme(String theme) {
		this.theme = theme;
	}

	public static boolean isValid(String value) {
		try {
			Theme.valueOf(value);
			return true;
		} catch (IllegalArgumentException e) {
			return false;
		}
	}

	public String getTheme() {
		return theme;
	}
}
