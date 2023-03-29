package bunsan.returnz.domain.game.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class GameHistoricalPriceDayDto {

	private LocalDateTime dateTime;
	private String open;
	private String high;
	private String low;
	private String close;
	private String volume;
	private String adjclose;
	private String dividends;
	private String companyName;
	private String logo;
}
