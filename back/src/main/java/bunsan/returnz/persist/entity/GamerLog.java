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

import bunsan.returnz.domain.game.dto.GamerLogDto;
import bunsan.returnz.domain.result.dto.GamerLogResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GamerLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "GAMER_ID")
	Long id;
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
	private Integer curTurn;
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MEMBER_ID")
	private Member member;

	public boolean updateDto(GamerLogDto gamerLogDto) {
		this.deposit = gamerLogDto.getDeposit();
		this.originDeposit = gamerLogDto.getOriginDeposit();
		this.totalPurchaseAmount = gamerLogDto.getTotalPurchaseAmount();
		this.totalEvaluationAsset = gamerLogDto.getTotalEvaluationAsset();
		this.totalEvaluationStock = gamerLogDto.getTotalEvaluationStock();
		this.totalProfitRate = gamerLogDto.getTotalProfitRate();
		this.gameRoom = gamerLogDto.getGameRoom();
		this.member = gamerLogDto.getMember();
		this.curTurn = gamerLogDto.getCurTurn();
		return true;
	}

	public GamerLogDto toDto(GamerLog gamerLog) {
		return GamerLogDto.builder()
			.deposit(gamerLog.getDeposit())
			.originDeposit(gamerLog.getOriginDeposit())
			.totalPurchaseAmount(gamerLog.getTotalPurchaseAmount())
			.totalEvaluationStock(gamerLog.getTotalEvaluationStock())
			.totalEvaluationAsset(gamerLog.getTotalEvaluationAsset())
			.totalProfitRate(gamerLog.getTotalProfitRate())
			.gameRoom(gamerLog.getGameRoom())
			.member(gamerLog.getMember())
			.build();
	}

	public GamerLogResponseDto toResponseDto(GamerLog gamerLog) {
		return GamerLogResponseDto.builder()
			.deposit(gamerLog.getDeposit())
			.originDeposit(gamerLog.getOriginDeposit())
			.totalPurchaseAmount(gamerLog.getTotalPurchaseAmount())
			.totalEvaluationStock(gamerLog.getTotalEvaluationStock())
			.totalEvaluationAsset(gamerLog.getTotalEvaluationAsset())
			.curTurn(gamerLog.getCurTurn())
			.totalProfitRate(gamerLog.getTotalProfitRate())
			.userName(gamerLog.getMember().getUsername())
			.userNickName(gamerLog.getMember().getNickname())
			.memberId(gamerLog.getMember().getId())
			.profileIcon(gamerLog.getMember().getProfileIcon())
			.build();
	}

}
