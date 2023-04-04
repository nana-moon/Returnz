package bunsan.returnz.domain.mainpage.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bunsan.returnz.domain.mainpage.dto.RankDto;
import bunsan.returnz.domain.mainpage.dto.StockDto;
import bunsan.returnz.domain.mainpage.dto.TodayWordDto;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.entity.TodayWord;
import bunsan.returnz.persist.entity.ValidCompany;
import bunsan.returnz.persist.repository.MemberRepository;
import bunsan.returnz.persist.repository.TodayWordRepository;
import bunsan.returnz.persist.repository.ValidCompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MainPageService {
	private final TodayWordRepository todayWordRepository;
	private final MemberRepository memberRepository;
	private final ValidCompanyRepository validCompanyRepository;

	public List<TodayWordDto> getWordList() {
		List<TodayWord> wordList = todayWordRepository.findAll();
		List<TodayWordDto> resultList = new ArrayList<>();
		for (TodayWord word : wordList) {
			resultList.add(word.toDto());
		}
		return resultList;
	}

	public List<RankDto> getUserRanks() {
		List<Member> memberList = memberRepository.findTop10ByOrderByAvgProfitDesc();
		List<RankDto> rankList = new ArrayList<>();
		for (Member member : memberList) {
			RankDto rankDto = RankDto.builder()
				.username(member.getUsername())
				.nickname(member.getNickname())
				.profileIcon(member.getProfileIcon())
				.avgProfit(member.getAvgProfit())
				.build();
			rankList.add(rankDto);
		}
		return rankList;
	}

	@Transactional
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
}
