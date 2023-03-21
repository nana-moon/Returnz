package bunsan.returnz.persist.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import bunsan.returnz.domain.game.enums.TurnPerTime;
import bunsan.returnz.domain.game.enums.TurnPerTimeConverter;
import lombok.Getter;

@Entity
@Getter
public class GameRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "GAME_ROOM_ID")
	Long id;
	Integer curTurn;
	LocalDate curDate;
	Integer totalTurn;
	@Convert(converter = TurnPerTimeConverter.class)
	TurnPerTime turnPerTime;



}
