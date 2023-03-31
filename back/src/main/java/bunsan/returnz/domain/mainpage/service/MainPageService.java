package bunsan.returnz.domain.mainpage.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.mainpage.dto.RankDto;
import bunsan.returnz.domain.mainpage.dto.TodayWordDto;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.entity.TodayWord;
import bunsan.returnz.persist.repository.MemberRepository;
import bunsan.returnz.persist.repository.TodayWordRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainPageService {
	private final TodayWordRepository todayWordRepository;
	private final MemberRepository memberRepository;

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
				.profileIcon(member.getProfileIcon().getCode())
				.avgProfit(member.getAvgProfit())
				.build();
			rankList.add(rankDto);
		}
		return rankList;
		// return null;
	}
}
