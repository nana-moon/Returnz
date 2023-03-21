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
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GameStock {
	@Id
	@Column(name = "SYMBOL_ID")
	String symbolId;
	String stockName;
	@ManyToOne
	@JoinColumn(name = "GAME_ROOM_ID")
	GameRoom gameRoom;
}
