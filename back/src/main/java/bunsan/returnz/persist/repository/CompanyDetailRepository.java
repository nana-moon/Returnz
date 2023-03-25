package bunsan.returnz.persist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.CompanyDetail;

public interface CompanyDetailRepository extends JpaRepository<CompanyDetail, String> {
}
