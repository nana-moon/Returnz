package bunsan.returnz.persist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.NewsGroup;

public interface NewsGroupRepository extends JpaRepository<NewsGroup, Long> {
}
