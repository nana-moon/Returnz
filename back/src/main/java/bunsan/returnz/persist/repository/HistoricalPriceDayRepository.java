package bunsan.returnz.persist.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import bunsan.returnz.persist.entity.HistoricalPriceDay;

public interface HistoricalPriceDayRepository extends JpaRepository<HistoricalPriceDay, Long> {
	@Query(value = "SELECT * FROM historical_price_day h\n"
		+ "WHERE h.date_time <= :dateTime AND h.company_code = :companyCode\n"
		+ "ORDER BY h.date_time DESC\n"
		+ "LIMIT 20", nativeQuery = true)
	List<HistoricalPriceDay> findAllByDateTimeIsBeforeWithCodeLimit20(LocalDateTime dateTime,
		String companyCode);

	@Query(value = "SELECT * FROM historical_price_day h\n"
		+ "WHERE h.date_time <= :dateTime AND h.company_code = :companyCode\n"
		+ "ORDER BY h.date_time DESC\n"
		+ "LIMIT 1", nativeQuery = true)
	List<HistoricalPriceDay> findAllByDateTimeIsBeforeWithCodeLimit1(LocalDateTime dateTime,
		String companyCode);

	@Query(value = "SELECT * FROM historical_price_day h\n"
		+ "WHERE h.date_time > :dateTime AND h.company_code = :companyCode\n"
		+ "ORDER BY h.date_time ASC\n"
		+ "LIMIT 1", nativeQuery = true)
	Optional<HistoricalPriceDay> findByDateTimeIsAfterWithCodeLimit1(LocalDateTime dateTime,
		String companyCode);

	Optional<HistoricalPriceDay> findByDateTimeAndCompanyCode(LocalDateTime dateTime, String companyCode);

	// day
	// week
	//month 별 턴처리 필요
	@Query(value = "SELECT h FROM HistoricalPriceDay h WHERE h.dateTime > :dateTime AND h.company.code IN :stockIds ORDER BY h.dateTime ASC")
	List<HistoricalPriceDay> getDayDataAfterStartDay(@Param("dateTime") LocalDateTime dateTime,
		@Param("stockIds") List<String> stockIds,
		Pageable pageable);
}
