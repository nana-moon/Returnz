package bunsan.returnz.persist.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.FinancialInformation;

public interface FinancialInformationRepository extends JpaRepository<FinancialInformation, Long> {

	@EntityGraph(value = "financial-information-with-company", type = EntityGraph.EntityGraphType.LOAD)
	@Query(value = "select f from FinancialInformation f join f.company c",
		countQuery = "select count(f) from FinancialInformation f")
	Page<FinancialInformation> findAllWithCompanies(Pageable pageable);
}
