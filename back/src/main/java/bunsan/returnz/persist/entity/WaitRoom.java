package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;

@Entity
@Getter
public class WaitRoom {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name="WAIT_ROOM_ID")
	Long id;
	String waitingTip;

}
