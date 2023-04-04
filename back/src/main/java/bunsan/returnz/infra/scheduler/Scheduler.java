package bunsan.returnz.infra.scheduler;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import bunsan.returnz.domain.member.enums.ProfileIcon;
import bunsan.returnz.persist.entity.EconomicWord;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.entity.Ranking;
import bunsan.returnz.persist.entity.TodayWord;
import bunsan.returnz.persist.repository.EconomicWordRepository;
import bunsan.returnz.persist.repository.MemberRepository;
import bunsan.returnz.persist.repository.RankingRepository;
import bunsan.returnz.persist.repository.TodayWordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class Scheduler {
	private final TodayWordRepository todayWordRepository;
	private final RankingRepository rankingRepository;
	private final MemberRepository memberRepository;
	private final EconomicWordRepository economicWordRepository;

	@Scheduled(cron = "0 0 0 * * *")
	public void updateTodayWords() {
		log.info("{}에 실행되었습니다.", LocalDateTime.now());
		todayWordRepository.deleteAll();

		// 랜덤으로 10개 추출해서 repo에 저장
		Pageable pageable = PageRequest.of(0, 10);
		Page<EconomicWord> wordPages = economicWordRepository.findRandomWords(pageable);
		List<EconomicWord> wordList = wordPages.getContent();
		System.out.println(wordList);

		// for문 돌면서 리스트에 넣어 save all 해버리기
		List<TodayWord> saveList = new ArrayList<>();
		for (EconomicWord word : wordList) {
			saveList.add(word.toTodayWord(word));
		}
		todayWordRepository.saveAll(saveList);
	}

	@Scheduled(cron = "0 0 0 * * *")
	@Transactional
	public void updateRanks() {
		log.info("{}에 실행되었습니다.", LocalDateTime.now());
		rankingRepository.deleteAll();

		List<Member> memberList = memberRepository.findTop10ByGameCountGreaterThanOrderByAvgProfitDesc(4L);
		List<Ranking> rankList = new ArrayList<>();
		int index = 0;
		for (Member member : memberList) {
			Ranking ranking = Ranking.builder()
				.username(member.getUsername())
				.nickname(member.getNickname())
				.profileIcon(member.getProfileIcon())
				.avgProfit(member.getAvgProfit())
				.build();
			rankList.add(ranking);
			// 랭킹 10위 이내
			checkProfileAndInsert(ProfileIcon.TEN, member);
			// 랭킹 3위 이내
			if (index <= 2) {
				checkProfileAndInsert(ProfileIcon.NINE, member);
				// 랭킹 1위
				if (index == 0) {
					checkProfileAndInsert(ProfileIcon.EIGHT, member);
				}
			}
			memberRepository.save(member);
			index++;
		}
		rankingRepository.saveAll(rankList);
	}

	private void checkProfileAndInsert(ProfileIcon icon, Member member) {
		if (!member.getPermittedProfiles().contains(icon.getCode())) {
			member.addProfile(icon.getCode());
		}
	}

}
