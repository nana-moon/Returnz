package bunsan.returnz.domain.game.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameGamerStockDto;
import bunsan.returnz.global.advice.exception.NotFoundException;
import bunsan.returnz.persist.entity.GamerStock;
import bunsan.returnz.persist.repository.GamerStockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GamerStockService {

	private final GamerStockRepository gamerStockRepository;

	public List<GameGamerStockDto> findAllByGamer_Id(Long gamerId) {
		List<GamerStock> gamerStocks = gamerStockRepository.findAllByGamer_Id(gamerId);

		// TODO: gamerStocks empty 오류 발생
		if (gamerStocks.isEmpty()) {
			throw new NotFoundException("해당 사용자의 주식 종목을 찾을 수 없습니다.");
		}

		GamerStock gamerStock = new GamerStock();
		List<GameGamerStockDto> gameGamerStockDtos = new ArrayList<>();
		for (GamerStock gamerStockItem : gamerStocks) {
			gameGamerStockDtos.add(gamerStock.toDto(gamerStockItem));
		}
		return gameGamerStockDtos;
	}

	public GameGamerStockDto findByGamerIdAndCompanyCode(Long gamerId, String companyCode) {
		Optional<GamerStock> optionalGamerStock = gamerStockRepository.findByGamerIdAndCompanyCode(gamerId,
			companyCode);
		GamerStock gamerStock = new GamerStock();

		return optionalGamerStock.map(gamerStock::toDto).orElse(null);
	}

	public boolean updateDto(GameGamerStockDto gameGamerStockDto) {

		Optional<GamerStock> optionalGamerStock = gamerStockRepository.findByGamerIdAndCompanyCode(
			gameGamerStockDto.getGamerId(), gameGamerStockDto.getCompanyCode());
		if (optionalGamerStock.isPresent()) {
			GamerStock gamerStock = optionalGamerStock.get();
			if (gamerStock.updateDto(gameGamerStockDto)) {
				gamerStockRepository.save(gamerStock);
				return true;
			}
			return false;
		}
		return false;
	}
}
