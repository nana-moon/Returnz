package bunsan.returnz.persist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.Gamer;

public interface GamerRepository extends JpaRepository<Gamer, Long> {
	List<Gamer> findAllByGameRoomId(Long id);
}
