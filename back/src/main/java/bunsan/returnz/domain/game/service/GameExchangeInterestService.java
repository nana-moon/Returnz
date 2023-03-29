package bunsan.returnz.domain.game.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameExchangeInterestDto;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.persist.entity.ExchangeInterest;
import bunsan.returnz.persist.repository.ExchangeInterestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameExchangeInterestService {

	private final ExchangeInterestRepository exchangeInterestRepository;

	public GameExchangeInterestDto findAllByDateIsBeforeLimit1(LocalDate date) {
		Optional<ExchangeInterest> gameExchangeInterestDtoOptional =
			exchangeInterestRepository.findAllByDateIsBeforeLimit1(date);

		if (gameExchangeInterestDtoOptional.isPresent()) {
			ExchangeInterest exchangeInterest = new ExchangeInterest();
			return exchangeInterest.toDto(gameExchangeInterestDtoOptional.get());
		}
		throw new BadRequestException("잘못된 날짜 요청입니다.");
	}
}
