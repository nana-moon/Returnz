package bunsan.returnz.domain.game.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Builder;

@Builder
public class RequestSettingGame {
	private String theme;
	//---- 사용자 설정일때만 아래 값을 사용합니다 -----
	private String ternPerTime;
	private LocalDate startTime;
	private String totalTurn;
	private List<String> memberIdList;

}
