package bunsan.returnz.domain.game.service.readonly;


import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bunsan.returnz.domain.game.dto.GameStockDto;
import bunsan.returnz.persist.entity.GameStock;
import bunsan.returnz.persist.repository.GameStockRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@AllArgsConstructor
@Slf4j
public class GameInfoService {
	private final GameStockRepository  gameStockRepository;
	public List<GameStockDto> getGameRoomStockList(Long gameRoomId){
		List<GameStock> allByGameRoomId = gameStockRepository.findAllByGameRoomId(gameRoomId);
		List<GameStockDto> result = new ArrayList<>();
		for (GameStock gameStockEntity : allByGameRoomId) {
			result.add(gameStockEntity.toDto(gameStockEntity));
		}
		return result;
	}
}
