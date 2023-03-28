package bunsan.returnz.domain.mainpage.api;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.mainpage.dto.TodayWordDto;
import bunsan.returnz.domain.mainpage.service.MainPageService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MainPageController {
	public final MainPageService mainPageService;

	@GetMapping("/api/today-words")
	public ResponseEntity<Map> getWordList() {
		List<TodayWordDto> requestDtoList = mainPageService.getWordList();
		return ResponseEntity.ok(Map.of("todayWordList", requestDtoList));
	}


}
