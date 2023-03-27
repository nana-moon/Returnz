package bunsan.returnz.persist.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.EconomicWord;

public interface EconomicWordRepository extends JpaRepository<EconomicWord, Long> {
	@Query(value = "SELECT e FROM EconomicWord e ORDER BY RAND()")
	Page<EconomicWord> findRandomWords(Pageable pageable);

}
