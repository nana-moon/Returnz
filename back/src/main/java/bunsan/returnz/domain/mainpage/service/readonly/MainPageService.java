package bunsan.returnz.domain.mainpage.service.readonly;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bunsan.returnz.domain.mainpage.dto.StockDto;
import bunsan.returnz.domain.mainpage.dto.TodayWordDto;
import bunsan.returnz.persist.entity.Ranking;
import bunsan.returnz.persist.entity.TodayWord;
import bunsan.returnz.persist.entity.ValidCompany;
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
	private final MemberRepository memberRepository;
	private final ValidCompanyRepository validCompanyRepository;
	private final RankingRepository rankingRepository;

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
	public void getDetail(String stockCode){
		//제일 최근 해당기업 financial_date
		//

	}
}
