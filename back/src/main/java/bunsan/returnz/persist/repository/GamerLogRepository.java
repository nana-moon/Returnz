package bunsan.returnz.persist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.GamerLog;

public interface GamerLogRepository extends JpaRepository<GamerLog, Long> {

	List<GamerLog> findAllByMemberIdAndGameRoomId(Long memberId, Long gameRoomId);
}
