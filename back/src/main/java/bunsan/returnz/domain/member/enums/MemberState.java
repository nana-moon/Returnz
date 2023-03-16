package bunsan.returnz.domain.member.enums;

public enum MemberState {
	OFFLINE("OFF"),
	ONLINE("ON"),
	GAME("GAME");
	private final String code;

	MemberState(String code) {
		this.code = code;
	}

	public String getCode() {
		return this.code;
	}
}
