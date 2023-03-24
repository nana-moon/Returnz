package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
	@Column(name = "COMPANY_CODE")
	private String companyCode;
	private Integer totalCount;
	private Integer totalAmount;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "GAMER_ID")
	private Gamer gamer;

	public GameGamerStockDto toDto(GamerStock gamerStock) {
		return GameGamerStockDto.builder()
			.companyCode(gamerStock.getCompanyCode())
			.totalCount(gamerStock.getTotalCount())
			.totalAmount(gamerStock.getTotalAmount())
			.gamerId(gamerStock.getGamer().getId())
			.build();
	}
}
