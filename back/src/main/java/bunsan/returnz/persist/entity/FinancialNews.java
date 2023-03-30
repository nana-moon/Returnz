package bunsan.returnz.persist.entity;

import java.time.LocalDateTime;

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
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FinancialNews {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FINANCIAL_NEWS_ID")
	private Long id;
	private String code;
	private String koName;
	@Column(columnDefinition = "VARCHAR(4000)")
	private String title;

	@Column(columnDefinition = "VARCHAR(4000)")
	private String summary;

	@Column(columnDefinition = "VARCHAR(4000)")
	private String articleLink;

	private LocalDateTime date;
}
