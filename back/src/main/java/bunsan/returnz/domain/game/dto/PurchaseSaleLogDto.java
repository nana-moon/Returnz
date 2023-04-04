package bunsan.returnz.domain.game.dto;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import bunsan.returnz.persist.entity.GameRoom;
import bunsan.returnz.persist.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Service
public class PurchaseSaleLogDto {

	private Integer curTurn;    // 매수, 매도를 한 턴
	private Integer totalTurn;    // 해당 게임의 전체 턴
	private String companyCode;    // 매수, 매도를 한 종목 코드
	private String companyName;    // 매수, 매도를 한 종목 이름
	private LocalDateTime date; //  매수, 매도를 한 날짜
	private Integer category; // 매수 : 0, 매도 : 1
	private Integer count; // 매수, 매도한 종목의 수
	private Integer price;    // 매수, 매도한 종목의 가격
	private GameRoom gameRoom;
	private Member member;

}
