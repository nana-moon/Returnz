package bunsan.returnz.persist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import bunsan.returnz.persist.entity.FriendRequest;


public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
	boolean existsFriendRequestByRequestUsernameAndTargetUsername(String requestUsername, String targetUsername);

	List<FriendRequest> findAllByTargetUsername(String targetUsername);

	Optional<FriendRequest> findById(Long id);

	void deleteById(Long id);
}
