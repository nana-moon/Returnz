package bunsan.returnz.persist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.GameStock;

public interface GameStockRepository extends JpaRepository<GameStock, String> {
	List<GameStock> findAllByGameRoomId(Long gameRoomId);
}
