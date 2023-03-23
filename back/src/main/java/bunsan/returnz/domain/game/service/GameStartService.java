package bunsan.returnz.domain.game.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.game.dto.RequestSettingGame;
import bunsan.returnz.persist.entity.Company;
import bunsan.returnz.persist.entity.GameRoom;
import bunsan.returnz.persist.entity.GameStock;
import bunsan.returnz.persist.repository.CompanyRepository;
import bunsan.returnz.persist.repository.GameStockRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class GameStartService {
	private final GameStockRepository gameStockRepository;
	CompanyRepository companyRepository;
	public Map<String, Object> settingGame(RequestSettingGame requestSettingGame) {
		// 주식방 만들기
		GameRoom newGameRoom = GameRoom.builder().roomId(UUID.randomUUID().toString()).build();
		// 랜덤 주식 가져와서 할당하기
		Pageable pageable = PageRequest.of(0, 10);
		// TODO: 2023/03/23 일단 랜덤 조건을 달아야한다면 전체 긁어와서 처리해야한다. ex 시가 총액
		Page<Company> randomCompaniesPage = companyRepository.findRandomCompanies(pageable);
		List<Company> CompanyList = randomCompaniesPage.getContent();
		for (Company company : CompanyList) {
			GameStock companyEntity = GameStock.builder()
				.companyName(company.getCompanyName())
				.companyCode(company.getCode())
				.gameRoom(newGameRoom)
				.build();
			gameStockRepository.save(companyEntity);
		}
		// 맴버 간져와서 주식방 게이머 에 할당하기

		// 게이머가 가진 주식 할당하기




		// 랜덤 주식 게임 방 세팅
		return null;
	}

}
