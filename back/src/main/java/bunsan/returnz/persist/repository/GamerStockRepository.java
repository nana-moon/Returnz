package bunsan.returnz.persist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.GamerStock;

public interface GamerStockRepository extends JpaRepository<GamerStock, String> {
}
