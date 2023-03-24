package bunsan.returnz.persist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.GamerStock;

public interface GamerStockRepository extends JpaRepository<GamerStock, Long> {
	List<GamerStock> findAllBygamerId(Long id);
}
