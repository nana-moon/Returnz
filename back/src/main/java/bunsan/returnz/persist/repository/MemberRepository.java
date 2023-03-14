package bunsan.returnz.persist.repository;

import java.util.Optional;

import bunsan.returnz.persist.entity.Member;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
	boolean existsMemberByNickname(String nickname);
	boolean existsMemberByUsername(String username);
	Optional<Member> findByUsername(String username);
	Optional<Member> findById(Long id);
}
