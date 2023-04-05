package bunsan.returnz.domain.news.api;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.news.dto.NewsRequestDto;
import bunsan.returnz.domain.news.dto.NewsResponseDto;
import bunsan.returnz.domain.news.service.NewsService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/news")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NewsController {
	private final NewsService newsService;

	@PostMapping
	public ResponseEntity<?> turnNews(@Valid @RequestBody NewsRequestDto newsRequestDto) {
		NewsResponseDto news = newsService.getNews(newsRequestDto);
		if (news.isValid()) {
			return ResponseEntity.ok().body(news);
		}
		return ResponseEntity.internalServerError().body("내부 애러 입니다.");
	}
}
