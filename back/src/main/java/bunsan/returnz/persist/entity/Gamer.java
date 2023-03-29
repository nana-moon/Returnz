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

	private Long memberId;
	private String username;
	private String userNickname;
	private Integer deposit;
	@Builder.Default
	private Integer totalBuyAmount = 0;
	@Builder.Default
	private Integer totalEvaluationAmount = 0;

	@Builder.Default
	private Boolean readyState = false;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "GAME_ROOM_ID")
	private GameRoom gameRoom;

	public GameGamerDto toDto(Gamer gamer) {
		return GameGamerDto.builder()
			.gamerId(gamer.getId())
			.mermberId(gamer.getMemberId())
			.userName(gamer.getUsername())
			.deposit(gamer.getDeposit())
			.totalBuyAmount(gamer.getTotalBuyAmount())
			.totalEvaluationAmount(gamer.getTotalBuyAmount())
			.build();
	}

	public boolean updateDeposit(Integer changeDeposit) {
		if (changeDeposit >= 0) {
			this.deposit = changeDeposit;
			return true;
		}
		// TODO : else Error
		return false;
	}

}
