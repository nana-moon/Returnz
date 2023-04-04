package bunsan.returnz.persist.entity;

import java.time.LocalDate;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedSubgraph;

import bunsan.returnz.domain.mainpage.enums.Market;
import bunsan.returnz.domain.mainpage.enums.MarketConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@NamedEntityGraph(
	name = "financial-validCompany-with-company",
	attributeNodes = {
		@NamedAttributeNode(value = "company", subgraph = "company-with-details")
	},
	subgraphs = {
		@NamedSubgraph(
			name = "company-with-details",
			attributeNodes = {
				@NamedAttributeNode("companyDetail")
			})
	}
)
public class ValidCompany {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "code")
	private Company company;
	private String koName;
	@Convert(converter = MarketConverter.class)
	private Market marketKind;
	private String stockName;
	private String serviceKind;
	private Long marketCap;
}
