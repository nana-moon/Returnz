package bunsan.returnz.domain.game.dto;

import bunsan.returnz.persist.entity.Company;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GameCompanyDetailDto {
	private Company company;
	private String countryCode;
	private String koName;
}
