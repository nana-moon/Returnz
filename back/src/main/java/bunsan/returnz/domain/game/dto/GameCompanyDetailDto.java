package bunsan.returnz.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GameCompanyDetailDto {
	private String companyCode;
	private String countryCode;
	private String koName;
	private String description;
	private String industry;
	private String sector;
	private String market;
	private String phone;
	private String website;
	private String logo;
}
