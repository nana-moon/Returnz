package bunsan.returnz.persist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bunsan.returnz.persist.entity.WaitRoom;

@Repository
public interface WaitRoomRepository extends JpaRepository<WaitRoom, Long> {

}
