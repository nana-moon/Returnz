package bunsan.returnz.domain.news.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/news")
public class NewsController {
	@GetMapping
	public ResponseEntity<?> turnNews() {
		// 요청 모든 구성원이 같은 뉴스를 줘야합니다
		// 1. 뉴스를 그룹을 테이블로 관리한다 n:M
		// 2. 조회 했을대 맨앞 인덱스 뉴스를 가져온다.
		// 2번방법은 편한데 테이블 없이 할수 있는데 같은기간에 다른 게임에서 같은 뉴스가 나온다...
		return null;
	}
}
