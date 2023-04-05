package bunsan.returnz.persist.entity;

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
public class RecommendedCompany {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "RECOMMENDED_COMPANY_ID")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "COMPANY_CODE")
	private Company company;

	private String simillarCompanyCode;
	private double score;
	private String parentTopics;
}
