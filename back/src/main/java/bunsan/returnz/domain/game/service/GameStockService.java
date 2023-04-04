package bunsan.returnz.domain.game.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameStockDto;
import bunsan.returnz.persist.entity.GameStock;
import bunsan.returnz.persist.repository.GameStockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameStockService {
	private final GameStockRepository gameStockRepository;

	public List<GameStockDto> findAllByGameRoomId(Long gameRoomId) {
		List<GameStock> gameStocks = gameStockRepository.findAllByGameRoomId(gameRoomId);

		List<GameStockDto> gameStockDtos = new ArrayList<>();
		GameStock gameStock = new GameStock();
		for (int i = 0; i < gameStocks.size(); ++i) {
			gameStockDtos.add(gameStock.toDto(gameStocks.get(i)));
		}
		return gameStockDtos;
	}

}
