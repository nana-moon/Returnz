package bunsan.returnz.persist.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
public class HistoricalPriceMinute {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORICAL_PRICE_MINUTE_ID")
	private Long id;

	private LocalDateTime dateTime;
	private String open;
	private String high;
	private String low;
	private String close;
	private String volume;
	private String adjclose;
	private String dividends;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "COMPANY_CODE", nullable = true)
	private Company company;
}
