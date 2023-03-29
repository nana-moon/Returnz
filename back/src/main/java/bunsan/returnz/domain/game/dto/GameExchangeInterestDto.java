package bunsan.returnz.domain.game.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GameExchangeInterestDto {
	LocalDate date;
	Double korea;
	Double exchangeRate;
	Double usa;
}
