package bunsan.returnz.domain.mainpage.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import bunsan.returnz.domain.mainpage.dto.TodayWordDto;
import bunsan.returnz.persist.entity.TodayWord;
import bunsan.returnz.persist.repository.TodayWordRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainPageService {
	private final TodayWordRepository todayWordRepository;

	public List<TodayWordDto> getWordList() {
		List<TodayWord> wordList = todayWordRepository.findAll();
		List<TodayWordDto> resultList = new ArrayList<>();
		for (TodayWord word : wordList) {
			resultList.add(word.toDto());
		}
		return resultList;
	}
}
