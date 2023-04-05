package bunsan.returnz.persist.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;

import bunsan.returnz.domain.game.enums.Theme;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.ConflictException;
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
	@Column(name = "ROOM_ID")
	@NotBlank
	private String roomId;

	@Builder.Default
	private Integer memberCount = 0;

	@Builder.Default
	private Theme theme = Theme.UNKNOWN;

	@OneToMany(cascade = CascadeType.REMOVE)
	@Builder.Default
	@JoinColumn(name = "ROOM_ID")
	private List<Waiter> waiterList = new ArrayList<>();

	private String captainName;

	public void insertWaiter(Waiter waiter) {
		if (this.memberCount >= 4) {
			throw new BadRequestException("대기방 인원이 4명 이상입니다.");
		}
		List<Waiter> waiters = this.waiterList;
		if (waiters.contains(waiter)) {
			throw new ConflictException("이미 대기방에 들어와 있는 유저입니다.");
		}
		this.waiterList.add(waiter);
		this.memberCount++;

	}

	public void deleteWaiter(Waiter waiter) {
		if (this.memberCount - 1 < 0) {
			throw new BadRequestException("대기방 인원이 음수 값입니다.");
		}
		List<Waiter> waiters = this.waiterList;
		waiters.remove(waiter);
		this.memberCount--;
	}

	public void changeTheme(Theme theme) {
		this.theme = theme;
	}

	public Boolean isCaptain(Member member) {
		if (this.captainName.equals(member.getUsername())) {
			return true;
		} else {
			return false;
		}
	}
}
