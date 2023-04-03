package bunsan.returnz.persist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.PurchaseSaleLog;

public interface PurchaseSaleLogRepository extends JpaRepository<PurchaseSaleLog, Long> {
}
