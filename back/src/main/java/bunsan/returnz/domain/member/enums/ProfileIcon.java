package bunsan.returnz.domain.member.enums;

public enum ProfileIcon {

	/** 생성 요철 (CREATE) **/
	/** 업데이트 요청 (UPDATE) **/
	ONE("A"), // 기본 이미지
	TWO("B"), // 누적 1판 달성
	THREE("C"), // 누적 5판 달성
	FOUR("D"), // 첫 1등
	FIVE("E"), // 꼴등
	SIX("F"), // 한 판 수익률 10퍼 이상
	SEVEN("G"), // 한 판 수익률 30퍼 이상
	EIGHT("H"), // 랭킹 1위 달성
	NINE("I"), // 랭킹 3위 달성
	TEN("J"), // 랭킹 10위 이내
	ELEVEN("K"), // 2번 연속 1등
	TWELVE("L"); // 친구 1명
	private final String code;

	ProfileIcon(String code) {
		this.code = code;
	}

	public String getCode() {
		return this.code;
	}
}
