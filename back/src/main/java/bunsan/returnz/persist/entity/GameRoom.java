package bunsan.returnz.persist.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

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
	private LocalDateTime preDate;
	private Integer totalTurn;
	@Builder.Default
	private Integer roomMemberCount = 1;
	@Convert(converter = TurnPerTimeConverter.class)
	private TurnPerTime turnPerTime;
	// 게임 정보를 조회할때 테마가 있으면 기간이 정해져 있다.
	@Convert(converter = ThemeConverter.class)
	private Theme theme;

	@OneToOne
	@JoinColumn(name = "NEWS_GROUP_ID")
	private NewsGroup newsGroup;

	public void setNewsGroup(NewsGroup inputNewsGroup) {
		if (inputNewsGroup == null) {
			throw new NullPointerException("게임방에 뉴스 그룹 할당하기전에 뉴스그룹이 널인지 확인해주세요");
		}
		this.newsGroup = inputNewsGroup;
	}

	public GameRoomDto toDto(GameRoom gameRoom) {
		return GameRoomDto.builder()
			.id(gameRoom.getId())
			.roomId(gameRoom.getRoomId())
			.curTurn(gameRoom.getCurTurn())
			.totalTurn(gameRoom.getTotalTurn())
			.curDate(gameRoom.getCurDate())
			.preDate(gameRoom.getPreDate())
			.turnPerTime(gameRoom.getTurnPerTime())
			.roomMemberCount(gameRoom.getRoomMemberCount())
			.build();
	}

	public boolean updateGameTurn(LocalDateTime curDate, LocalDateTime nextCurDate) {
		// TODO: nextCurDate validation Check
		if (nextCurDate == null) {
			return false;
		}

		// TODO : 현재턴은 토탈턴을 넘길 수 없음
		//  if(this.totalTurn < this.curTurn)
		if (this.totalTurn < this.curTurn) {
			return false;
		}
		this.preDate = curDate;
		this.curDate = nextCurDate;
		this.curTurn += 1;
		return true;
	}

}
