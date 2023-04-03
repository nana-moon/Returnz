package bunsan.returnz.persist.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.RiemannThemeCompany;

public interface RiemannThemeCompanyRepository extends JpaRepository<RiemannThemeCompany, String> {
	@Query(value = "SELECT c.companyCode FROM RiemannThemeCompany c ORDER BY RAND()")
	Page<String> findRandomCompaniesId(Pageable pageable);
}
