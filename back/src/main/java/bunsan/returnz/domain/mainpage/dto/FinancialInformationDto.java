package bunsan.returnz.domain.mainpage.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class FinancialInformationDto {

	private String companyCode;
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
}
