package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	@JsonIgnore
	private Long id;
	private Long memberId;
	private String profileIcon;
	private Double avgProfit;
	private String nickname;
	private String username;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ROOM_ID", referencedColumnName = "ROOM_ID")
	@JsonIgnore
	private WaitRoom waitRoom;

}
