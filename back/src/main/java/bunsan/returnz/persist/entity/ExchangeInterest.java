package bunsan.returnz.persist.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeInterest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "EXCHANGE_INTEREST_ID")
	private Long id;
	LocalDate date;
	Double korea;
	Double exchangeRate;
	Double usa;
}
