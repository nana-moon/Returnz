package bunsan.returnz.domain.game.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameExchangeInterestDto {
	LocalDate date;
	Double korea;
	Double exchangeRate;
	Double usa;
}
