package bunsan.returnz.persist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.WaitRoom;
import bunsan.returnz.persist.entity.Waiter;

public interface WaiterRepository extends JpaRepository<Waiter, Long> {
	boolean existsByWaitRoomAndMemberId(WaitRoom waitRoom, Long memberId);

	Optional<Waiter> findByWaitRoomAndMemberId(WaitRoom waitRoom, Long memberId);
}
