package bunsan.returnz.domain.game.enums;

public enum TurnPerTime {
	NO("NO"),
	WEEK("WEEK"),
	MONTH("MONTH"),
	DAY("DAY"),
	MINUTE("MINUTE");

	private String time;

	TurnPerTime(String time) {
		this.time = time;
	}

	public String getTime() {
		return time;
	}
}
