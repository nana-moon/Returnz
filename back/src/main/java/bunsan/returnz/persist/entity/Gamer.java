package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import bunsan.returnz.domain.game.dto.GameGamerDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Gamer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "GAMER_ID")
	Long id;

	private String username;
	private Integer deposit;
	private Integer totalBuyAmount;
	private Integer totalEvaluationAmount;

	@Builder.Default
	private Boolean readyState = false;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "GAME_ROOM_ID")
	private GameRoom gameRoom;

	public GameGamerDto toDto(Gamer gamer) {
		return GameGamerDto.builder()
			.gamerId(gamer.getId())
			.userName(gamer.getUsername())
			.deposit(gamer.getDeposit())
			.totalBuyAmoount(gamer.getTotalBuyAmount())
			.totalEvaluationAmount(gamer.getTotalBuyAmount())
			.build();
	}

}
