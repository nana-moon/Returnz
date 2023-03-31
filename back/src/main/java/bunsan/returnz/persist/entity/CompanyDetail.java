package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.validation.constraints.Size;

import bunsan.returnz.domain.game.dto.GameCompanyDetailDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CompanyDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "COMPANNY_DETAIL_CODE")
	private String code;

	@MapsId
	@OneToOne
	@JoinColumn(name = "COMPANY_CODE")
	private Company company;
	String countryCode;
	String koName;
	@Size(max = 1000)
	String description;
	String sector;
	String industry;
	String logo;
	String market;
	String phone;
	String website;

	public GameCompanyDetailDto toDto(CompanyDetail companyDetail) {
		return GameCompanyDetailDto.builder()
			.companyCode(companyDetail.getCompany().getCode())
			.countryCode(companyDetail.getCountryCode())
			.koName(companyDetail.getKoName())
			.description(companyDetail.getDescription())
			.industry(companyDetail.getIndustry())
			.sector(companyDetail.getSector())
			.market(companyDetail.getMarket())
			.phone(companyDetail.getPhone())
			.website(companyDetail.getWebsite())
			.logo(companyDetail.getLogo())
			.build();
	}
}
