package bunsan.returnz.domain.news.api;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
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
public class NewsController {
	private final NewsService newsService;

	@PostMapping
	public ResponseEntity<?> turnNews(@RequestBody NewsRequestDto newsRequestDto) {
		// 요청을 뭘 받아야하나??
		// 필요한 턴,
		// 입력 방 번호, 날자, 기업
		log.info("hi");

		NewsResponseDto news = newsService.getNews(newsRequestDto);
		if (news.isValid()) {
			return ResponseEntity.ok().body(news);
		}
		return ResponseEntity.badRequest().body("정상출력 안됨");
	}
}
