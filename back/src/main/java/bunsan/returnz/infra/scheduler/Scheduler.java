package bunsan.returnz.infra.scheduler;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import bunsan.returnz.persist.entity.EconomicWord;
import bunsan.returnz.persist.entity.TodayWord;
import bunsan.returnz.persist.repository.EconomicWordRepository;
import bunsan.returnz.persist.repository.TodayWordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class Scheduler {
	private final TodayWordRepository todayWordRepository;
	private final EconomicWordRepository economicWordRepository;

	@Scheduled(cron = "0 * * * * *")
	public void updateTodayWords() {
		log.info("{}에 실행되었습니다.", LocalDateTime.now());
		todayWordRepository.deleteAll();

		// 랜덤으로 10개 추출해서 repo에 저장
		List<EconomicWord> wordList = economicWordRepository.findByRandom();
		log.info(wordList.toString());

		// for문 돌면서 리스트에 넣어 save all 해버리기
		List<TodayWord> saveList = new ArrayList<>();
		for (EconomicWord word : wordList) {
			saveList.add(word.toTodayWord(word));
		}
		todayWordRepository.saveAll(saveList);
	}

	@Scheduled(cron = "0 0 0 * * *")
	public void updateRanks() {
		log.info("{}에 실행되었습니다.", LocalDateTime.now());
	}

}
