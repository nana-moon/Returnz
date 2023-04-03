package bunsan.returnz.persist.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.Company;
import io.lettuce.core.dynamic.annotation.Param;

public interface CompanyRepository extends JpaRepository<Company, String> {
	@Query(value = "SELECT c FROM Company c ORDER BY RAND()")
	Page<Company> findRandomCompanies(Pageable pageable);

	@Query(value = "SELECT c FROM Company c where c.code in :companyList ORDER BY RAND()")
	Page<Company> findCompaniesByCodeList(@Param("companyList") List<String> companyList);
}
