package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
	@Column(name = "WAIT_MEMBER_ID")
	private Long id;
	private Long profit;
	private Long deposit;
	private Boolean isCaptain;
	private String userName;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "WAIT_ROOM_ID")
	private WaitRoom waitRoom;


}
