package bunsan.returnz.persist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	boolean existsMemberByNickname(String nickname);

	boolean existsMemberByUsername(String username);

	Optional<Member> findByUsername(String username);

	Optional<Member> findById(Long id);

	// 맴버 리스트를 받고 찾아오는 래포지토리
	List<Member> findAllById(Iterable<Long> ids);
}
