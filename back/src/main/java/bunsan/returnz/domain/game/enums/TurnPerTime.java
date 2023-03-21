package bunsan.returnz.domain.game.enums;

public enum TurnPerTime {

	Minute("MINUTE"),
	Month("MONTH"),
	Day("DAY");

	private String time;
	TurnPerTime(String time) {
		this.time = time;
	}

	public String getTime() {
		return time;
	}
}
