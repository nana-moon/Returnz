package bunsan.returnz.persist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bunsan.returnz.persist.entity.EconomicWord;

public interface EconomicWordRepository extends JpaRepository<EconomicWord, Long> {
	@Query(value = "SELECT * FROM yg_db.economic_word order by RAND() limit 10", nativeQuery = true)
	List<EconomicWord> findByRandom();

}
