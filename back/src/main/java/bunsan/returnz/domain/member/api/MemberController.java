package bunsan.returnz.domain.member.api;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.friend.dto.FriendInfo;
import bunsan.returnz.domain.member.dto.LoginRequest;
import bunsan.returnz.domain.member.dto.NewNicknameDto;
import bunsan.returnz.domain.member.dto.NewProfileDto;
import bunsan.returnz.domain.member.dto.SignupRequest;
import bunsan.returnz.domain.member.service.MemberService;
import bunsan.returnz.global.auth.dto.TokenInfo;
import bunsan.returnz.persist.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// TODO: 2023-03-29 프론트 서버에 맞게 CrossOrigin 변경

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
	@GetMapping
	public ResponseEntity findByNickname(@RequestParam("nickname") String nickname) {
		List<FriendInfo> memberList = memberService.findByNickname(nickname);
		return ResponseEntity.ok().body(Map.of("memberList", memberList));
	}

	//---------------------------------------닉네임 변경-----------------------------------------
	@PatchMapping("/nickname")
	public ResponseEntity changeNickname(@RequestHeader("Authorization") String bearerToken,
		@RequestBody @Valid NewNicknameDto newNicknameDto) {
		String token = bearerToken.substring(7);
		memberService.changeNickname(token, newNicknameDto.getNewNickname());
		return ResponseEntity.ok().body(Map.of("result", "success"));
	}

	//---------------------------------------닉네임 변경-----------------------------------------
	@PatchMapping("/profile")
	public ResponseEntity changeProfile(@RequestHeader("Authorization") String bearerToken,
		@RequestBody @Valid NewProfileDto newProfileDto) {
		String token = bearerToken.substring(7);
		memberService.changeProfile(token, newProfileDto.getNewProfile());
		return ResponseEntity.ok().body(Map.of("result", "success"));
	}

	//------------------------------------프로필 추가 임시 api-------------------------------------
	@PatchMapping("/plus")
	public ResponseEntity changePlus(@RequestHeader("Authorization") String bearerToken,
		@RequestBody @Valid NewProfileDto newProfileDto) {
		String token = bearerToken.substring(7);
		memberService.changePlus(token, newProfileDto.getNewProfile());
		return ResponseEntity.ok().body(Map.of("result", "success"));
	}

	//-----------------------------------해금된 프로필 조회-------------------------------------
	@GetMapping("/profiles")
	public ResponseEntity getPermittedProfiles(@RequestHeader("Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		Set<String> permittedProfiles = memberService.getPermittedProfiles(token);
		return ResponseEntity.ok().body(Map.of("permittedProfiles", permittedProfiles));
	}

	//--------------------------------------맴버 상태 변경----------------------------------------
	@PatchMapping("/state")
	public ResponseEntity changeMemberState(@RequestHeader("Authorization") String bearerToken) {
		String token = bearerToken.substring(7);
		memberService.changeMemberState(token);
		return ResponseEntity.ok().body(Map.of("result", "success"));
	}

}
