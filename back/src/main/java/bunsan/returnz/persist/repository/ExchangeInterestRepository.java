package bunsan.returnz.persist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.ExchangeInterest;

public interface ExchangeInterestRepository extends JpaRepository<ExchangeInterest, Long> {
}
