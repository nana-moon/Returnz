package bunsan.returnz.domain.member.api;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.member.dto.LoginRequest;
import bunsan.returnz.domain.member.dto.SignupRequest;
import bunsan.returnz.domain.member.service.MemberService;
import bunsan.returnz.global.auth.dto.TokenInfo;
import bunsan.returnz.persist.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/api/members")
@Slf4j
public class MemberController {
	private final MemberService memberService;

	//--------------------------------------회원가입-------------------------------------------
	@PostMapping("/signup")
	public ResponseEntity signup(@Valid @RequestBody SignupRequest signupRequest) {
		Member member = memberService.signup(signupRequest);
		return ResponseEntity.created(URI.create("/members/" + member.getId())).build();
	}

	//--------------------------------------로그인-------------------------------------------
	@PostMapping("/login")
	public ResponseEntity<TokenInfo> login(@RequestBody LoginRequest loginRequest) {
		TokenInfo tokenInfo = memberService.login(loginRequest.getUsername(), loginRequest.getPassword());
		return ResponseEntity.ok().body(tokenInfo);
	}

}
