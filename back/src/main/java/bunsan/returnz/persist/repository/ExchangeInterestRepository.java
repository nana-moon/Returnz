package bunsan.returnz.persist.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.ExchangeInterest;

public interface ExchangeInterestRepository extends JpaRepository<ExchangeInterest, Long> {
	@Query(value = "SELECT * FROM exchange_interest e\n"
		+ "WHERE e.date <= :date\n"
		+ "ORDER BY e.date DESC\n"
		+ "LIMIT 1", nativeQuery = true)
	Optional<ExchangeInterest> findAllByDateIsBeforeLimit1(LocalDate date);

}
