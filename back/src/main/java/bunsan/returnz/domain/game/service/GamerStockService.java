package bunsan.returnz.domain.game.service;

import java.util.ArrayList;
import java.util.List;

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

	public List<GameGamerStockDto> findAllBygamerId(Long gamerId) {
		List<GamerStock> gamerStocks = gamerStockRepository.findAllBygamerId(gamerId);

		// TODO: gamerStocks empty 오류 발생
		// if(gamerStocks.isEmpty())

		GamerStock gamerStock = new GamerStock();
		List<GameGamerStockDto> gameGamerStockDtos = new ArrayList<>();
		for (GamerStock gamerStockItem : gamerStocks) {
			gameGamerStockDtos.add(gamerStock.toDto(gamerStockItem));
		}
		return gameGamerStockDtos;
	}
}
