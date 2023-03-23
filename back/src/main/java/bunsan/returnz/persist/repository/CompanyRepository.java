package bunsan.returnz.persist.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, String> {
	@Query(value = "SELECT c FROM Company c ORDER BY RAND()")
	Page<Company> findRandomCompanies(Pageable pageable);
}
