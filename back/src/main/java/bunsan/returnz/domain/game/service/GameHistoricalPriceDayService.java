package bunsan.returnz.domain.game.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameHistoricalPriceDayDto;
import bunsan.returnz.persist.entity.HistoricalPriceDay;
import bunsan.returnz.persist.repository.HistoricalPriceDayRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameHistoricalPriceDayService {

	private final HistoricalPriceDayRepository historicalPriceDayRepository;

	public List<GameHistoricalPriceDayDto> findAllByDateTimeIsBeforeWithCodeLimit20(
		LocalDateTime date, String companyCode) {
		List<HistoricalPriceDay> historicalPriceDays =
			historicalPriceDayRepository.findAllByDateTimeIsBeforeWithCodeLimit20(
				date, companyCode);

		// TODO: historicalPriceDays 없을 경우 에러 발생 / 또는 개수가 적을 경우
		// if(historicalPriceDays.isEmpty())

		List<GameHistoricalPriceDayDto> gameHistoricalPriceDayDtos = new LinkedList<>();
		HistoricalPriceDay historicalPriceDay = new HistoricalPriceDay();
		for (int i = 0; i < historicalPriceDays.size(); ++i) {
			gameHistoricalPriceDayDtos.add(historicalPriceDay.toDto(historicalPriceDays.get(i)));
		}
		// 순서 뒤집기
		Collections.reverse(gameHistoricalPriceDayDtos);
		return gameHistoricalPriceDayDtos;
	}

	public List<GameHistoricalPriceDayDto> findAllByDateTimeIsBeforeWithCodeLimit1(
		LocalDateTime date, String companyCode) {
		List<HistoricalPriceDay> historicalPriceDays =
			historicalPriceDayRepository.findAllByDateTimeIsBeforeWithCodeLimit1(
				date, companyCode);

		// TODO: historicalPriceDays 없을 경우 에러 발생 / 또는 개수가 적을 경우
		// if(historicalPriceDays.isEmpty())

		List<GameHistoricalPriceDayDto> gameHistoricalPriceDayDtos = new LinkedList<>();
		HistoricalPriceDay historicalPriceDay = new HistoricalPriceDay();
		for (int i = 0; i < historicalPriceDays.size(); ++i) {
			gameHistoricalPriceDayDtos.add(historicalPriceDay.toDto(historicalPriceDays.get(i)));
		}
		return gameHistoricalPriceDayDtos;
	}

	public GameHistoricalPriceDayDto findByDateTimeIsAfterWithCodeLimit1(LocalDateTime date, String companyCode) {
		Optional<HistoricalPriceDay> optionalHistoricalPriceDay =
			historicalPriceDayRepository.findByDateTimeIsAfterWithCodeLimit1(
				date, companyCode);
		HistoricalPriceDay historicalPriceDay = new HistoricalPriceDay();

		return optionalHistoricalPriceDay.map(historicalPriceDay::toDto).orElse(null);
	}

	public GameHistoricalPriceDayDto findByDateTimeAndCompanyCode(LocalDateTime dateTime, String companyCode) {
		Optional<HistoricalPriceDay> optionalHistoricalPriceDay =
			historicalPriceDayRepository.findByDateTimeAndCompanyCode(
				dateTime, companyCode);
		HistoricalPriceDay historicalPriceDay = new HistoricalPriceDay();
		return optionalHistoricalPriceDay.map(historicalPriceDay::toDto)
			.orElse(null);
	}

	public List<GameHistoricalPriceDayDto> findAllByDateTimeIsBeforeWithCodeLimit6(
		LocalDateTime date, String companyCode) {
		List<HistoricalPriceDay> historicalPriceDays =
			historicalPriceDayRepository.findAllByDateTimeIsBeforeWithCodeLimit6(
				date, companyCode);

		// TODO: historicalPriceDays 없을 경우 에러 발생 / 또는 개수가 적을 경우
		// if(historicalPriceDays.isEmpty())

		List<GameHistoricalPriceDayDto> gameHistoricalPriceDayDtos = new LinkedList<>();
		HistoricalPriceDay historicalPriceDay = new HistoricalPriceDay();
		for (int i = 0; i < historicalPriceDays.size(); ++i) {
			gameHistoricalPriceDayDtos.add(historicalPriceDay.toDto(historicalPriceDays.get(i)));
		}
		return gameHistoricalPriceDayDtos;
	}

	public GameHistoricalPriceDayDto findByDateTimeIsBeforeWithCodeLimit1(LocalDateTime date, String companyCode) {
		Optional<HistoricalPriceDay> historicalPriceDayOptional
			= historicalPriceDayRepository.findByDateTimeIsBeforeWithCodeLimit1(
			date, companyCode);

		if (historicalPriceDayOptional.isPresent()) {
			HistoricalPriceDay historicalPriceDay = new HistoricalPriceDay();
			return historicalPriceDay.toDto(historicalPriceDayOptional.get());
		}
		return null;
	}

}
