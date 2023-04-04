package bunsan.returnz.domain.mainpage.enums;


public enum Market {


	NASDAQ("NASDAQ"),
	KOSPI("KOSPI");

	private String market;
	Market(String market) {
		this.market = market;
	}

	public String getMarket() {
		return market;
	}
}
