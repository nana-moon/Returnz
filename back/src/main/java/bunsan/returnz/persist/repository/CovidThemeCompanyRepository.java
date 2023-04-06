package bunsan.returnz.persist.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.CovidThemeCompany;
import io.lettuce.core.dynamic.annotation.Param;

public interface CovidThemeCompanyRepository extends JpaRepository<CovidThemeCompany, String> {
	@Query(value = "SELECT c.companyCode FROM CovidThemeCompany c  ORDER BY RAND()")
	Page<String> findRandomCompaniesId(Pageable pageable);
}
