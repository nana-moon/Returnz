package bunsan.returnz.domain.game.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.GameCompanyDetailDto;
import bunsan.returnz.persist.entity.CompanyDetail;
import bunsan.returnz.persist.repository.CompanyDetailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameCompanyDetailService {
	private final CompanyDetailRepository companyDetailRepository;

	public GameCompanyDetailDto findByCompanyCode(String companyCode) {
		Optional<CompanyDetail> optionalCompanyDetail = companyDetailRepository.findById(companyCode);
		CompanyDetail companyDetail = new CompanyDetail();
		return optionalCompanyDetail.map(companyDetail::toDto).orElse(null);
	}
}
