package bunsan.returnz.persist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.Ranking;

public interface RankingRepository extends JpaRepository<Ranking, Long> {
	List<Ranking> findAllByOrderByAvgProfitDesc();
}
