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

import bunsan.returnz.domain.game.dto.GameGamerStockDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GamerStock {
	@Id
	@Column(name = "GAME_STOCK_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "COMPANY_CODE")
	private String companyCode;
	@Builder.Default
	@ColumnDefault("0")
	@Column(nullable = false)
	private Integer totalCount = 0;
	@Builder.Default
	@ColumnDefault("0")
	@Column(nullable = false)
	private Integer totalAmount = 0;

	@Builder.Default
	@ColumnDefault("0")
	@Column(nullable = false)
	private Integer averagePrice = 0;

	@Builder.Default
	@ColumnDefault("0")
	@Column(nullable = false)
	private Double valuation = 0.0;

	@Builder.Default
	@ColumnDefault("0")
	@Column(nullable = false)
	private Double profitRate = 0.0;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "GAMER_ID")
	private Gamer gamer;

	public GameGamerStockDto toDto(GamerStock gamerStock) {
		return GameGamerStockDto.builder()
			.id(gamerStock.getId())
			.companyCode(gamerStock.getCompanyCode())
			.totalCount(gamerStock.getTotalCount())
			.gamerId(gamerStock.getGamer().getId())
			.totalAmount(gamerStock.getTotalAmount())
			.gamerId(gamerStock.getGamer().getId())
			.averagePrice(gamerStock.getAveragePrice())
			.valuation(gamerStock.getValuation())
			.profitRate(gamerStock.getProfitRate())
			.build();
	}

	public boolean updateDto(GameGamerStockDto gameGamerStockDto) {
		this.totalAmount = gameGamerStockDto.getTotalAmount();
		this.averagePrice = gameGamerStockDto.getAveragePrice();
		this.valuation = gameGamerStockDto.getValuation();
		this.profitRate = gameGamerStockDto.getProfitRate();
		this.totalCount = gameGamerStockDto.getTotalCount();
		return true;
	}

	public boolean updateBuyStockCount(Integer count, Double price) {
		this.totalCount += count;
		this.totalAmount = Math.toIntExact(Math.round(this.totalCount * price));
		return true;
	}
}
