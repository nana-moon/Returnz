package bunsan.returnz.persist.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import bunsan.returnz.domain.game.dto.GameRoomDto;
import bunsan.returnz.domain.game.enums.TurnPerTime;
import bunsan.returnz.domain.game.enums.TurnPerTimeConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "GAME_ROOM_ID")
	private Long id;
	@Column(unique = true)
	private String roomId;
	private Integer curTurn;
	private LocalDateTime curDate;
	private Integer totalTurn;
	@Builder.Default
	private Integer roomMemberCount = 1;
	@Convert(converter = TurnPerTimeConverter.class)
	private TurnPerTime turnPerTime;

	public GameRoomDto toDto(GameRoom gameRoom) {
		return GameRoomDto.builder()
			.id(gameRoom.id)
			.roomId(gameRoom.roomId)
			.curTurn(gameRoom.curTurn)
			.totalTurn(gameRoom.totalTurn)
			.curDate(gameRoom.curDate)
			.roomMemberCount(gameRoom.roomMemberCount)
			.build();
	}

	public boolean updateGameTurn(LocalDateTime nextCurDate) {
		// TODO: nextCurDate validation Check
		if (nextCurDate.isEqual(null)) {
			return false;
		}

		// TODO : 현재턴은 토탈턴을 넘길 수 없음
		//  if(this.totalTurn < this.curTurn)
		if (this.totalTurn < this.curTurn) {
			return false;
		}

		this.curDate = nextCurDate;
		this.curTurn += 1;
		return true;
	}

}
