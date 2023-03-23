HistoricalPriceMinutepackage bunsan.returnz.persist.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoricalPriceHour {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORICAL_PRICE_ID")
	private Long id;

	private LocalDateTime dateTime;
	private double open;
	private double high;
	private double low;
	private double close;
	private double volume;
	private double adjclose;
	private double dividends;

	@ManyToOne
	@JoinColumn(name = "COMPANY_CODE")
	private Company company;
}
