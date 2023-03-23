package bunsan.returnz.domain.game.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import bunsan.returnz.domain.game.enums.Theme;
import bunsan.returnz.domain.game.enums.TurnPerTime;
import bunsan.returnz.global.advice.exception.BadRequestException;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import reactor.util.annotation.Nullable;

@Builder
@Getter
@ToString // TODO: 2023/03/23  나중에 지워야합니다.
public class RequestSettingGame {
	@NotNull
	private Theme theme;
	//---- 사용자 설정일때만 아래 값을 사용합니다 -----
	@Nullable
	private TurnPerTime ternPerTime;
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") // 이 양식은 널러블 합니다.
	private LocalDateTime startTime;
	@Nullable
	private Integer totalTurn;
	private List<String> memberIdList;

	public void validateRequestSettingGame() {

		if (this.theme.getTheme().equals("USER")) {
			// 세게중 하나라도 널이면 안된다.
			if ((this.totalTurn == null
				|| this.startTime == null
				||this.ternPerTime == null
			)) {
				throw new BadRequestException("사용자 태마는 총턴수, 시작 일,시, 턴당 시간 을 지정하세요");
			}
			// 시작일로 부터 현재까지 남은 턴수
			long weekBetweenTurn = ChronoUnit.WEEKS.between(this.startTime, LocalDateTime.now());
			long monthsBetweenTurn = ChronoUnit.MONTHS.between(this.startTime, LocalDateTime.now());
			long daysBetweenTurn = ChronoUnit.DAYS.between(this.startTime, LocalDateTime.now());
			if (this.ternPerTime.getTime().equals("DAY")
				&& this.totalTurn > daysBetweenTurn) {
				throw new BadRequestException("시작일수로 부터 가능한 일 이 더 작습니다. 계산된 일 "+ daysBetweenTurn);
			}
			if (this.ternPerTime.getTime().equals("WEEK")
				&& this.totalTurn > weekBetweenTurn) {
				throw new BadRequestException("시작일수로 부터 가능한 주 가 더 작습니다. 계산된 주 " + weekBetweenTurn);
			}
			if (this.ternPerTime.getTime().equals("MONTH")
				&& this.totalTurn > monthsBetweenTurn) {
				throw new BadRequestException("시작일수로 부터 가능한 달 이 더 작습니다. 계산된 달 " + monthsBetweenTurn);
			}

		}
	}

}
