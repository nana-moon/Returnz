package bunsan.returnz.persist.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedSubgraph;

import bunsan.returnz.domain.mainpage.dto.FinancialInformationDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor

@NamedEntityGraph(
	name = "financial-information-with-company",
	attributeNodes = {
		@NamedAttributeNode(value = "company", subgraph = "company-with-details")
	},
	subgraphs = {
		@NamedSubgraph(
			name = "company-with-details",
			attributeNodes = {
				@NamedAttributeNode("companyDetail")
			})
	}
)
public class FinancialInformation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FINANCIAL_INFORMATION_ID")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "company_code")
	private Company company;
	private Long ebit;
	private Long ebitda;
	private Long netDebt;
	private Long operatingCashFlow;
	private String periodType;
	private Long shareIssued;
	private Long totalAssets;
	private Long totalCapitalization;
	private Long totalDebt;
	private Long totalRevenue;
	private LocalDate dateTime;
	private Long freeCashFlow;

	public FinancialInformationDto toDto() {
		return FinancialInformationDto.builder()
			.companyCode(this.company.getCode())
			.ebit(this.ebit)
			.ebitda(this.ebitda)
			.netDebt(this.netDebt)
			.operatingCashFlow(this.operatingCashFlow)
			.periodType(this.periodType)
			.shareIssued(this.shareIssued)
			.totalAssets(this.totalAssets)
			.totalCapitalization(this.totalCapitalization)
			.totalDebt(this.totalDebt)
			.totalRevenue(this.totalRevenue)
			.dateTime(this.dateTime)
			.freeCashFlow(this.freeCashFlow)
			.build();
	}

}
