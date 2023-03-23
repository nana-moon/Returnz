package bunsan.returnz.domain.game.enums;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import bunsan.returnz.domain.game.dto.RequestSettingGame;
import bunsan.returnz.global.advice.exception.BadRequestException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public enum Theme {
	COVID("COVID"),
	DOTCOM("DOTCOM"),
	USER("USER"),
	LAST_YEAR("LAST_YEAR"),
	LAST_MONTH("LAST_MONTH");

	private final String theme;

	Theme(String theme) {
		this.theme = theme;
	}

	public static boolean isValid(Theme value) {
		try {
			Theme.valueOf(String.valueOf(value));
			return true;
		} catch (IllegalArgumentException e) {
			return false;
		}
	}

	public String getTheme() {
		return theme;
	}

	// TODO: 2023/03/23 이거 디티오에 있어야하는거 같은데요?
	public void validateRequestSettingGame(RequestSettingGame requestSettingGame) {

		if (requestSettingGame.getTheme().getTheme().equals("USER")) {
			// 세게중 하나라도 널이면 안된다.
			if ((requestSettingGame.getTotalTurn() == null
				|| requestSettingGame.getStartTime() == null
				|| requestSettingGame.getTernPerTime() == null
			)) {
				throw new BadRequestException("사용자 태마는 총턴수, 시작 일,시, 턴당 시간 을 지정하세요");
			}
			// 시작일로 부터 현재까지 남은 턴수
			long weekBetweenTurn = ChronoUnit.WEEKS.between(requestSettingGame.getStartTime(), LocalDateTime.now());
			long monthsBetweenTurn = ChronoUnit.MONTHS.between(requestSettingGame.getStartTime(), LocalDateTime.now());
			long daysBetweenTurn = ChronoUnit.DAYS.between(requestSettingGame.getStartTime(), LocalDateTime.now());
			if (requestSettingGame.getTernPerTime().getTime().equals("DAY")
				&& requestSettingGame.getTotalTurn() > daysBetweenTurn) {
				throw new BadRequestException("시작일수로 부터 가능한 일 이 더 작습니다. 계산된 일 "+ daysBetweenTurn);
			}
			if (requestSettingGame.getTernPerTime().getTime().equals("WEEK")
				&& requestSettingGame.getTotalTurn() > weekBetweenTurn) {
				throw new BadRequestException("시작일수로 부터 가능한 주 가 더 작습니다. 계산된 주 " + weekBetweenTurn);
			}
			if (requestSettingGame.getTernPerTime().getTime().equals("MONTH")
				&& requestSettingGame.getTotalTurn() > monthsBetweenTurn) {
				throw new BadRequestException("시작일수로 부터 가능한 달 이 더 작습니다. 계산된 달 " + monthsBetweenTurn);
			}

		}
	}
}
