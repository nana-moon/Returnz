package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
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
public class Waiter {
	@GeneratedValue
	@Id
	@Column(name = "WAITER_ID")
	Long id;
	Boolean isCaptain;
	String username;
	String nickname;

	@ManyToOne
	@JoinColumn(name = "WAIT_ROOM_ID")
	WaitRoom waitRoom;


}
