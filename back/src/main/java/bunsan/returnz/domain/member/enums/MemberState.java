package bunsan.returnz.domain.member.enums;

public enum MemberState {
	OFFLINE("OFFLINE"),
	ONLINE("ONLINE"),
	BUSY("BUSY");
	private final String code;

	MemberState(String code) {
		this.code = code;
	}

	public String getCode() {
		return this.code;
	}
}
