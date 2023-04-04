package bunsan.returnz.domain.game.service;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GamerLogDto;
import bunsan.returnz.global.advice.exception.BusinessException;
import bunsan.returnz.persist.entity.GamerLog;
import bunsan.returnz.persist.repository.GamerLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GamerLogService {

	private final GamerLogRepository gamerLogRepository;

	public boolean updateDto(GamerLogDto gamerLogDto) {
		try {
			GamerLog gamerLog = new GamerLog();
			gamerLog.updateDto(gamerLogDto);
			gamerLogRepository.save(gamerLog);
			return true;
		} catch (Exception e) {
			throw new BusinessException("Gamer Log를 update할 수 없습니다.");
		}
	}

}
