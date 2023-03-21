package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class GameStock {
	@Id
	@Column(name = "SYMBOL_ID")
	String symbolId;
	String stockName;
	@ManyToOne
	@JoinColumn(name = "GAME_ROOM_ID")
	GameRoom gameRoom;
}
