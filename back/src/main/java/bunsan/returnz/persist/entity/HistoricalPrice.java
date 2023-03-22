package bunsan.returnz.persist.entity;

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
public class HistoricalPrice {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORICAL_PRICE_ID")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "company_id")
	private Company company;
	private Long high;
	private Long volume;
	private Long close;
	private Long low;
	private Long open;
	private Long adjclose;
	private Long dividends;
	private LocalDateTime dateTime;
}
