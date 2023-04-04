package bunsan.returnz.persist.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.FinancialInformation;
import bunsan.returnz.persist.entity.ValidCompany;

public interface ValidCompanyRepository extends JpaRepository<ValidCompany, Long> {

	@EntityGraph(value = "financial-validCompany-with-company", type = EntityGraph.EntityGraphType.LOAD)
	@Query(value = "select v from ValidCompany v join v.company c",
		countQuery = "select count(f) from ValidCompany f")
	Page<ValidCompany> findAllWithCompanies(Pageable pageable);
}
