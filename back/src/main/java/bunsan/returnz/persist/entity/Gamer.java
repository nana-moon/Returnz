package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
public class Gamer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "GAMER_ID")
	Long id;

	String username;
	Integer deposit;
	Integer totalBuyAmount;
	Integer totalEvaluationAmount;

	@Builder.Default
	Boolean readyState = false;

	@ManyToOne
	@JoinColumn(name = "GAME_ROOM_ID")
	GameRoom gameRoom;



}
