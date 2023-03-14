package bunsan.returnz.domain.member.enums;

public enum ProfileIcon {

	/** 생성 요철 (CREATE) **/
	/** 업데이트 요청 (UPDATE) **/
	ONE("A"),
	TWO("B"),
	THREE("C"),
	FOUR("D"),
	FIVE("E"),
	SIX("F"),
	SEVEN("G"),
	EIGHT("H"),
	NINE("I"),
	TEN("J"),
	ELEVEN("K"),
	TWELVE("L");
	private String code;
	private ProfileIcon(String code) {
		this.code = code;
	}
	public String getCode() {
		return this.code;
	}
}
