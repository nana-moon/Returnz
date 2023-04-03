package bunsan.returnz.domain.game.service;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.PurcahseSaleLogDto;
import bunsan.returnz.persist.entity.PurchaseSaleLog;
import bunsan.returnz.persist.repository.PurchaseSaleLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PurchaseSaleLogService {

	private final PurchaseSaleLogRepository purchaseSaleLogRepository;

	public boolean updateDto(PurcahseSaleLogDto purcahseSaleLogDto) {
		PurchaseSaleLog purchaseSaleLog = new PurchaseSaleLog();
		purchaseSaleLog.updateDto(purcahseSaleLogDto);
		purchaseSaleLogRepository.save(purchaseSaleLog);
		return true;
	}

}
