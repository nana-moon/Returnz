package bunsan.returnz.domain.game.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameGamerStockDto;
import bunsan.returnz.persist.entity.GamerStock;
import bunsan.returnz.persist.repository.GamerStockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GamerStockService {
	private static GamerStockRepository gamerStockRepository;

	public List<GameGamerStockDto> findAllByGamerId(Long gamerId) {
		List<GamerStock> gamerStocks = gamerStockRepository.findAllByGamerId(gamerId);

		// TODO: gamerStocks empty 오류 발생
		// if(gamerStocks.isEmpty())

		GamerStock gamerStock = new GamerStock();
		List<GameGamerStockDto> gameGamerStockDtos = new ArrayList<>();
		for (GamerStock gamerStockItem : gamerStocks) {
			gameGamerStockDtos.add(gamerStock.toDto(gamerStockItem));
		}
		return gameGamerStockDtos;
	}

	public GameGamerStockDto findByGamerIdAndCompanyCode(Long gmaerId, String companyCode) {
		Optional<GamerStock> optionalGamerStock = gamerStockRepository.findByGamerIdAndCompanyCode(gmaerId,
			companyCode);
		GamerStock gamerStock = new GamerStock();

		return optionalGamerStock.map(gamerStock::toDto).orElse(null);
	}

	// public boolean createGamerStockService(GameGamerStockDto gameGamerStockDto) {
	//
	// }
}
