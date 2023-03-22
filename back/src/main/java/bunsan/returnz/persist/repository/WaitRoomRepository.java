package bunsan.returnz.persist.repository;

import bunsan.returnz.persist.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bunsan.returnz.persist.entity.WaitRoom;

import java.util.Optional;

@Repository
public interface WaitRoomRepository extends JpaRepository<WaitRoom, Long> {

    Optional<WaitRoom> findByRoomId(String roomId);

}
