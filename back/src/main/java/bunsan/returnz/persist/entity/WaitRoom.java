package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import bunsan.returnz.global.advice.exception.BadRequestException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WaitRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "WAIT_ROOM_ID")
	private Long id;

	@Column(name = "ROOM_ID")
	private String roomId;

	@Builder.Default
	Integer memberCount = 0;

	String captainName;

	public void plusMemberCount() {
		if (this.memberCount >= 4) {
			throw new BadRequestException("대기방 인원이 4명 이상입니다.");
		}
		this.memberCount++;
	}

	public void minusMemberCount() {
		this.memberCount--;
		if (this.memberCount < 0) {
			throw new BadRequestException("대기방 인원이 음수 값입니다.");
		}
	}
}
