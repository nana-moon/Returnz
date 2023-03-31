package bunsan.returnz.domain.news.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bunsan.returnz.domain.news.dto.NewsRequestDto;
import bunsan.returnz.domain.news.dto.NewsResponseDto;
import bunsan.returnz.global.advice.exception.BusinessException;
import bunsan.returnz.persist.entity.FinancialNews;
import bunsan.returnz.persist.entity.GameRoom;
import bunsan.returnz.persist.entity.NewsGroup;
import bunsan.returnz.persist.repository.GameRoomRepository;
import bunsan.returnz.persist.repository.NewsGroupRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class NewsService {
	private final GameRoomRepository gameRoomRepository;

	@Transactional
	public NewsResponseDto getNews(NewsRequestDto newsRequestDto) {

		GameRoom gameRoom = gameRoomRepository.findById(newsRequestDto.getId())
			.orElseThrow(() -> new BusinessException("게임이 업습닏다."));
		NewsGroup newsGroup = gameRoom.getNewsGroup();
		List<FinancialNews> financialNewsList = newsGroup.getFinancialNews();
		for (FinancialNews financialNews : financialNewsList) {
			if (financialNews.getDate().isEqual(newsRequestDto.getArticleDateTime())) {
				return NewsResponseDto.builder()
					.title(financialNews.getTitle())
					.isExist(Boolean.TRUE)
					.summary(financialNews.getSummary())
					.articleUrl(financialNews.getArticleLink())
					.build();
			}
		}
		return NewsResponseDto.builder()
			.isExist(Boolean.FALSE)
			.build();
	}
}
