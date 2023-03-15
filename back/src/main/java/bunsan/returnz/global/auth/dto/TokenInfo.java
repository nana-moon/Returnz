package bunsan.returnz.global.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class TokenInfo {
	private String grantType; //JWT 대한 인증 타입, Bearer를 사용, 이후 HTTP 헤더에 prefix로 붙일 타입
	private String accessToken;
	private String refreshToken;

}
