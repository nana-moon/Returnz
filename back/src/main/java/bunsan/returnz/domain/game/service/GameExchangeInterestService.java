package bunsan.returnz.domain.game.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameExchangeInterestService {

	// public Double findKoreaByDateIsBeforeLimit1(LocalDate date) {
	// 	EntityManagerFactory emf = Persistence.createEntityManagerFactory("persistence-unit-name");
	// 	@PersistenceContext
	// 	EntityManager em;
	// 	EntityTransaction tx = em.getTransaction();
	// 	String jpql = "SELECT e.korea FROM ExchangeInterest e WHERE e.date >= :date ORDER BY date ASC";
	// 	return em.createQuery(jpql, Double.class).getSingleResult();
	// }
	//
	// public Double findUsaByDateIsBeforeLimit1(LocalDate date) {
	// 	EntityManager em;
	// 	EntityTransaction tx = em.getTransaction();
	// 	String jpql = "SELECT e.usa FROM ExchangeInterest e WHERE e.date >= :date ORDER BY date ASC";
	// 	return em.createQuery(jpql, Double.class).getSingleResult();
	// }
	//
	// public Double findExchangeRateByDateIsBeforeLimit1(LocalDate date) {
	// 	EntityManager em;
	// 	EntityTransaction tx = em.getTransaction();
	// 	String jpql = "SELECT e.exchangeRate FROM ExchangeInterest e WHERE e.date >= :date ORDER BY date ASC";
	// 	return em.createQuery(jpql, Double.class).getSingleResult();
	// }
	//
	// public List<Double> findAllByDateIsBeforeLimit1(LocalDate date) {
	// 	EntityManager em;
	// 	EntityTransaction tx = em.getTransaction();
	// 	String jpql = "SELECT e FROM ExchangeInterest e WHERE e.date >= :date ORDER BY date ASC";
	// 	return em.createQuery(jpql, Double.class).getResultList();
	// }

}
