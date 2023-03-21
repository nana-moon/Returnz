package bunsan.returnz.domain.game.enums;

public enum Decision {
	BUY("BUY"),
	SELL("SELL"),
	STAY("STAY");
	private String decision;

	Decision(String decision) {
		this.decision = decision;
	}

	public String getDecision() {
		return decision;
	}
}
