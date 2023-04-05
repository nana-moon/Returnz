package bunsan.returnz.persist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.TodayWord;

public interface TodayWordRepository extends JpaRepository<TodayWord, Long> {
	List<TodayWord> findAll();

	void deleteAll();

}
