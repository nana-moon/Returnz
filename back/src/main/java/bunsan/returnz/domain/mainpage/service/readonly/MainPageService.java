package bunsan.returnz.domain.mainpage.service.readonly;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bunsan.returnz.domain.game.dto.GameCompanyDetailDto;
import bunsan.returnz.domain.mainpage.dto.FinancialInformationDto;
import bunsan.returnz.domain.mainpage.dto.StockDto;
import bunsan.returnz.domain.mainpage.dto.TodayWordDto;
import bunsan.returnz.global.advice.exception.BusinessException;
import bunsan.returnz.persist.entity.CompanyDetail;
import bunsan.returnz.persist.entity.FinancialInformation;
import bunsan.returnz.persist.entity.Ranking;
import bunsan.returnz.persist.entity.TodayWord;
import bunsan.returnz.persist.entity.ValidCompany;
import bunsan.returnz.persist.repository.CompanyDetailRepository;
import bunsan.returnz.persist.repository.FinancialInformationRepository;
import bunsan.returnz.persist.repository.MemberRepository;
import bunsan.returnz.persist.repository.RankingRepository;
import bunsan.returnz.persist.repository.TodayWordRepository;
import bunsan.returnz.persist.repository.ValidCompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MainPageService {
	private final TodayWordRepository todayWordRepository;
	private final ValidCompanyRepository validCompanyRepository;
	private final RankingRepository rankingRepository;
	private final FinancialInformationRepository financialInformationRepository;
	private final CompanyDetailRepository companyDetailRepository;

	public List<TodayWordDto> getWordList() {
		List<TodayWord> wordList = todayWordRepository.findAll();
		List<TodayWordDto> resultList = new ArrayList<>();
		for (TodayWord word : wordList) {
			resultList.add(word.toDto());
		}
		return resultList;
	}

	public List<Ranking> getUserRanks() {
		return rankingRepository.findAllByOrderByAvgProfitDesc();
	}

	public List<StockDto> recomandStockList() {
		Pageable pageable = PageRequest.of(0, 4, Sort.by(Sort.Direction.DESC, "marketCap"));
		List<ValidCompany> sortedList = validCompanyRepository.findAllWithCompanies(pageable)
			.getContent();
		List<StockDto> stockDtos = new ArrayList<>();
		for (ValidCompany financialInformation : sortedList) {
			StockDto build = StockDto.builder()
				.stockName(financialInformation.getCompany().getCompanyName())
				.stockCode(financialInformation.getCompany().getCode())
				.logo(financialInformation.getCompany().getCompanyDetail().getLogo())
				.build();
			stockDtos.add(build);
		}
		return stockDtos;
	}

	public Map<?, ?> getDetail(String stockCode) {
		// 제일 최근 해당기업 financial_date 전부다
		Pageable pageable = PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "dateTime"));
		List<FinancialInformation> getListRecent = financialInformationRepository.recentFinancialInfo(pageable,
				stockCode)
			.getContent();
		if (getListRecent.size() == 0) {
			throw new BusinessException("디비에 정보가 없습니다.");
		}
		FinancialInformationDto recentFinancialDto = getListRecent.get(0).toDto();
		CompanyDetail getCompanyDetail = companyDetailRepository.findById(stockCode)
			.orElseThrow(() -> new NullPointerException("회사가 데이터 베이스에 없습니다"));
		GameCompanyDetailDto gameCompanyDetailDto = getCompanyDetail.toDto(getCompanyDetail);
		log.info(gameCompanyDetailDto.getKoName());
		log.info(recentFinancialDto.getCompanyCode());
		Map<String, Object> res = new HashMap<>();
		res.put("company", gameCompanyDetailDto);
		res.put("financial", recentFinancialDto);

		return res;
	}
}
