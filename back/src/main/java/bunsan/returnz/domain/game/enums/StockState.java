package bunsan.returnz.domain.game.enums;

/**
 * 전날 대비 증가 감소 유지 했는지 에 대해 사용하는 상태 이넘입니다.
 */
public enum StockState {
	UP("UP"),
	DOWN("DOWN"),
	STAY("STAY");
	private String state;
	StockState(String state) {
		this.state = state;
	}

	public String getState() {
		return state;
	}

}
