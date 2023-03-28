package bunsan.returnz.domain.game.dto;

import bunsan.returnz.domain.member.enums.ProfileIcon;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GameGamerDto {
	private Long gamerId;
	private Long mermberId;
	private String userName;
	private ProfileIcon userProfileIcon;
	private Integer deposit;
	private Integer totalBuyAmount;
	private Integer totalEvaluationAmount;
}
