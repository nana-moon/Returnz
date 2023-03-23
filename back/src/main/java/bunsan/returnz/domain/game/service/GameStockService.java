package bunsan.returnz.domain.game.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameStockDto;
import bunsan.returnz.domain.game.dto.RequestSettingGame;
import bunsan.returnz.persist.entity.GameStock;
import bunsan.returnz.persist.repository.GameStockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameStockService {
	private final GameStockRepository gameStockRepository;

	public List<GameStockDto> findAllBygameRoomId(String gameRoomId) {
		List<GameStock> gameStocks = gameStockRepository.findAllBygameRoomId(gameRoomId);

		// TODO: gameStocks 없을 경우 에러 발생 / 또는 개수가 적은 경우
		// if(gameStocks.isEmpty() && gameStocks.size() == 0) {
		//
		// }

		List<GameStockDto> gameStockDtos = new ArrayList<>();
		GameStock gameStock = new GameStock();
		for (int i = 0; i < gameStocks.size(); ++i) {
			GameStock gameStock = new GameStock();
			gameStockDtos.add(gameStock.toDto(gameStocks.get(i)));
		}
		return gameStockDtos;
	}



	public String settingUserGame(RequestSettingGame requestSettingGame) {
		return null;
	}

	public String settingThemeGame(RequestSettingGame requestSettingGame) {
		return null;
	}
}
