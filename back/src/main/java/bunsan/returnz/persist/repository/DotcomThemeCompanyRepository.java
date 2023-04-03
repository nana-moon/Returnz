package bunsan.returnz.persist.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.DotcomThemeCompany;

public interface DotcomThemeCompanyRepository extends JpaRepository<DotcomThemeCompany, String> {
	@Query(value = "SELECT d FROM DotcomThemeCompany d ORDER BY RAND()")
	Page<DotcomThemeCompany> findRandomCompaniesId(Pageable pageable);
}
