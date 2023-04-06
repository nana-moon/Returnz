package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

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
	private Integer originDeposit;
	@Builder.Default
	@ColumnDefault("0")
	@Column(nullable = false)
	private Integer totalPurchaseAmount = 0;
	@Builder.Default
	@ColumnDefault("0")
	@Column(nullable = false)
	private Integer totalEvaluationAsset = 0;
	@Builder.Default
	@ColumnDefault("0")
	@Column(nullable = false)
	private Integer totalEvaluationStock = 0;
	@Builder.Default
	@ColumnDefault("0")
	@Column(nullable = false)
	private Double totalProfitRate = 0.0;
	@Builder.Default
	@Column(nullable = false)
	private Boolean readyState = false;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "GAME_ROOM_ID")
	private GameRoom gameRoom;

	public GameGamerDto toDto(Gamer gamer) {
		return GameGamerDto.builder()
			.gamerId(gamer.getId())
			.memberId(gamer.getMemberId())
			.userName(gamer.getUsername())
			.deposit(gamer.getDeposit())
			.originDeposit(gamer.getOriginDeposit())
			.totalPurchaseAmount(gamer.getTotalPurchaseAmount())
			.totalEvaluationAsset(gamer.getTotalEvaluationAsset())
			.totalEvaluationStock(gamer.getTotalEvaluationStock())
			.totalProfitRate(gamer.getTotalProfitRate())
			.build();
	}

	public boolean updateDto(GameGamerDto gameGamerDto) {
		this.deposit = gameGamerDto.getDeposit();
		this.totalPurchaseAmount = gameGamerDto.getTotalPurchaseAmount();
		this.totalEvaluationAsset = gameGamerDto.getTotalEvaluationAsset();
		this.totalEvaluationStock = gameGamerDto.getTotalEvaluationStock();
		this.totalProfitRate = gameGamerDto.getTotalProfitRate();
		return true;
	}

}
