package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
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
public class CompanyDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "COMPANNY_DETAIL_CODE")
	private String code;

	@MapsId
	@OneToOne
	@JoinColumn(name = "COMPANY_CODE")
	private Company company;
	String countryCode;
	String koName;
	@Size(max = 1000)
	String description;
	String sector;
	String industry;
	String logo;
	String market;
	String phone;
	String website;
}
