package bunsan.returnz.persist.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.HistoricalPriceDay;

public interface HistoricalPriceDayRepository extends JpaRepository<HistoricalPriceDay, Long> {
	@Query(value = "SELECT h FROM HistoricalPriceDay h\n"
		+ "WHERE h.dateTime <= :dateTime AND h.companyCode = :companyCode\n"
		+ "ORDER BY h.dateTime DESC\n"
		+ "LIMIT 20", nativeQuery = true)
	List<HistoricalPriceDay> findAllByDateTimeIsBeforeWithCodeLimit20(LocalDateTime dateTime,
		String companyCode);

	@Query(value = "SELECT h FROM HistoricalPriceDay h\n"
		+ "WHERE h.dateTime <= :dateTime AND h.companyCode = :companyCode\n"
		+ "ORDER BY h.dateTime DESC\n"
		+ "LIMIT 1", nativeQuery = true)
	List<HistoricalPriceDay> findAllByDateTimeIsBeforeWithCodeLimit1(LocalDateTime dateTime,
		String companyCode);

	@Query(value = "SELECT h FROM HistoricalPriceDay h\n"
		+ "WHERE h.dateTime > :dateTime AND h.companyCode = :companyCode\n"
		+ "ORDER BY h.dateTime DESC\n"
		+ "LIMIT 1", nativeQuery = true)
	Optional<HistoricalPriceDay> findByDateTimeIsAfterWithCodeLimit1(LocalDateTime dateTime,
		String companyCode);

	Optional<HistoricalPriceDay> findByDateTimeAndCompanyCode(LocalDateTime dateTime, String companyCode);
}
