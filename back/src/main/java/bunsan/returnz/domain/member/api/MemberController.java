package bunsan.returnz.domain.member.api;

import java.net.URI;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import bunsan.returnz.domain.friend.dto.FriendInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import bunsan.returnz.domain.member.dto.LoginRequest;
import bunsan.returnz.domain.member.dto.SignupRequest;
import bunsan.returnz.domain.member.service.MemberService;
import bunsan.returnz.global.auth.dto.TokenInfo;
import bunsan.returnz.persist.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
	//--------------------------------------회원 검색-------------------------------------------
	@GetMapping("/{nickname}")
	public ResponseEntity findByNickname(@PathVariable String nickname) {
		List<FriendInfo> memberList = memberService.findByNickname(nickname);
		return ResponseEntity.ok().body(Map.of("memberList", memberList));
	}

}
