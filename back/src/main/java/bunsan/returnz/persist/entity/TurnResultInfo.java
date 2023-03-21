package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import bunsan.returnz.domain.game.enums.Decision;
import bunsan.returnz.domain.game.enums.DecisionConverter;
import lombok.Getter;

@Entity
@Getter
public class TurnResultInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TURN_INFO_ID")
	Long id;
	Integer seq;
	String symbolId;
	Integer balance;
	@Convert(converter = DecisionConverter.class)
	Decision decision;

}
