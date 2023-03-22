package bunsan.returnz.persist.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CorporateEvent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CORPORATE_EVENT_ID")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "COMPANY_CODE")
	private Company company;

	private LocalDateTime date;
	private int significance;
	private String headline;

	@Size(max = 1000)
	private String description;

	private String parentTopics;
}
