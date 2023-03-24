package bunsan.returnz.persist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bunsan.returnz.persist.entity.WaitRoom;

@Repository
public interface WaitRoomRepository extends JpaRepository<WaitRoom, Long> {

	Optional<WaitRoom> findByRoomId(String roomId);

}
