package bunsan.returnz.persist.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestEntitiy {
    @GeneratedValue
    @Id
    @Column(name = "WAIT_MEMBER_ID")
    Long id;
    Long profit;
    Long deposit;
    Boolean isCaptain;
    String userName;
    @ManyToOne
    @JoinColumn(name = "WAIT_ROOM_ID")
    WaitRoom waitRoom;
}
