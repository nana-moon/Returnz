package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GamerStock {
	@Id
	@Column(name = "SYMBOL_ID")
	private String symbolId;
	private Integer totalCount;
	private Integer totalAmount;

	@ManyToOne
	@JoinColumn(name = "GAMER_ID")
	private Gamer gamer;

}
