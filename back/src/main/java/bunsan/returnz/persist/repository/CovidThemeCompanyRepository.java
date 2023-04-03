package bunsan.returnz.persist.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.CovidThemeCompany;

public interface CovidThemeCompanyRepository extends JpaRepository<CovidThemeCompany, String> {
	@Query(value = "SELECT c FROM CovidThemeCompany c ORDER BY RAND()")
	Page<CovidThemeCompany> findRandomCompaniesId(Pageable pageable);
}
