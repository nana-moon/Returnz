package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;

@Entity
@Getter
public class Gamer_stock {
	@Id
	@Column(name = "SYMBOL_ID")
	String symbolId;
	Integer totalCount;
	Integer totalAmount;

	@ManyToOne
	@JoinColumn(name = "GAMER_ID")
	Gamer gamer;


}
