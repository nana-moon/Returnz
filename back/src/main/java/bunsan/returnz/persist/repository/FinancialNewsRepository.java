package bunsan.returnz.persist.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.FinancialNews;
import io.lettuce.core.dynamic.annotation.Param;

public interface FinancialNewsRepository extends JpaRepository<FinancialNews, Long> {
	@Query(value = "SELECT fn FROM FinancialNews fn WHERE fn.date >= :startDate ORDER BY fn.date ASC")
	List<FinancialNews> findAllUpTurn(@Param("startDate") LocalDateTime startDate, Pageable pageable);

}
