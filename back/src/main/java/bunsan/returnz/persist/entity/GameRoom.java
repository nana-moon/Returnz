package bunsan.returnz.persist.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import bunsan.returnz.domain.game.dto.GameRoomDto;
import bunsan.returnz.domain.game.enums.Theme;
import bunsan.returnz.domain.game.enums.ThemeConverter;
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
	@Column(unique = true) // 소켓에서 쓰일 아이디
	private String roomId;
	@Builder.Default
	private Integer curTurn = 0;
	private LocalDateTime curDate;
	private Integer totalTurn;
	@Builder.Default
	private Integer roomMemberCount = 1;
	@Convert(converter = TurnPerTimeConverter.class)
	private TurnPerTime turnPerTime;
	// 게임 정보를 조회할때 테마가 있으면 기간이 정해져 있다.
	@Convert(converter = ThemeConverter.class)
	private Theme theme;

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
}
