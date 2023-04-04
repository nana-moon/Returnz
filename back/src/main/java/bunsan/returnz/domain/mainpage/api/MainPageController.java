package bunsan.returnz.domain.mainpage.api;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.mainpage.dto.TodayWordDto;
import bunsan.returnz.domain.mainpage.service.MainPageService;
import bunsan.returnz.persist.entity.Ranking;
import lombok.RequiredArgsConstructor;

// TODO: 2023-03-29 프론트 서버에 맞게 CrossOrigin 변경

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MainPageController {
	public final MainPageService mainPageService;

	@GetMapping("/api/today-words")
	public ResponseEntity<Map> getWordList() {
		List<TodayWordDto> requestDtoList = mainPageService.getWordList();
		return ResponseEntity.ok(Map.of("todayWordList", requestDtoList));
	}

	@GetMapping("/api/user-ranks")
	public ResponseEntity<Map> getUserRanks() {
		List<Ranking> requestDtoList = mainPageService.getUserRanks();
		return ResponseEntity.ok(Map.of("userRank", requestDtoList));
	}

}
