package bunsan.returnz.persist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.GamerStock;

public interface GamerStockRepository extends JpaRepository<GamerStock, Long> {
	List<GamerStock> findAllByGamerId(Long id);

	Optional<GamerStock> findByGamerIdAndCompanyCode(Long id, String companyCode);
}
