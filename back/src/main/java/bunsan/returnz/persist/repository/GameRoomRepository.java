package bunsan.returnz.persist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bunsan.returnz.persist.entity.GameRoom;

@Repository
public interface GameRoomRepository extends JpaRepository<GameRoom, Long> {
	Optional<GameRoom> findByroomId(String roomId);
}
