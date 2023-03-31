package bunsan.returnz.persist.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NewsGroup {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "NEWS_GROUP_ID")
	private Long id;

	@ManyToMany
	@JoinColumn(name = "FINANCIAL_NEWS_ID")
	private List<FinancialNews> financialNews;

	private LocalDateTime startTime;
	private LocalDateTime endTime;

}
