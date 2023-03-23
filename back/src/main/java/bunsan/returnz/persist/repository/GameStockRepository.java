package bunsan.returnz.persist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bunsan.returnz.persist.entity.GameStock;

@Repository
public interface GameStockRepository extends JpaRepository<GameStock, String> {
	List<GameStock> findAllBygameRoomId(String gameRoomId);
}
