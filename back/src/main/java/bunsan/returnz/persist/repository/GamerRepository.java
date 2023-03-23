package bunsan.returnz.persist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.Gamer;

public interface GamerRepository extends JpaRepository<Gamer, Long> {
}
