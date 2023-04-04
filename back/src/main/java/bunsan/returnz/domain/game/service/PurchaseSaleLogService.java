package bunsan.returnz.domain.game.service;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.PurchaseSaleLogDto;
import bunsan.returnz.persist.entity.PurchaseSaleLog;
import bunsan.returnz.persist.repository.PurchaseSaleLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PurchaseSaleLogService {

	private final PurchaseSaleLogRepository purchaseSaleLogRepository;

	public boolean updateDto(PurchaseSaleLogDto purchaseSaleLogDto) {
		PurchaseSaleLog purchaseSaleLog = new PurchaseSaleLog();
		purchaseSaleLog.updateDto(purchaseSaleLogDto);
		purchaseSaleLogRepository.save(purchaseSaleLog);
		return true;
	}

}
