package bunsan.returnz.domain.game.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import bunsan.returnz.domain.game.enums.Theme;
import bunsan.returnz.domain.game.enums.TurnPerTime;
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

}
