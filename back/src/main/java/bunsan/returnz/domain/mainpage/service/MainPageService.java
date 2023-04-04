package bunsan.returnz.domain.mainpage.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.mainpage.dto.TodayWordDto;
import bunsan.returnz.persist.entity.Ranking;
import bunsan.returnz.persist.entity.TodayWord;
import bunsan.returnz.persist.repository.MemberRepository;
import bunsan.returnz.persist.repository.RankingRepository;
import bunsan.returnz.persist.repository.TodayWordRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainPageService {
	private final TodayWordRepository todayWordRepository;
	private final MemberRepository memberRepository;
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
		// List<Member> memberList = memberRepository.findTop10ByGameCountGreaterThanOrderByAvgProfitDesc(4L);
		// List<Ranking> rankList = new ArrayList<>();
		// for (Member member : memberList) {
		// 	Ranking ranking = Ranking.builder()
		// 		.username(member.getUsername())
		// 		.nickname(member.getNickname())
		// 		.profileIcon(member.getProfileIcon())
		// 		.avgProfit(member.getAvgProfit())
		// 		.build();
		// 	rankList.add(ranking);
		// }
		// return rankList;
		// return null;
		return rankingRepository.findAllByOrderByAvgProfitDesc();
	}
}
