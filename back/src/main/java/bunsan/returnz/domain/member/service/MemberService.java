package bunsan.returnz.domain.member.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.member.dto.SignupRequest;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.ConflictException;
import bunsan.returnz.global.advice.exception.NotFoundException;
import bunsan.returnz.global.auth.dto.TokenInfo;
import bunsan.returnz.global.auth.service.JwtTokenProvider;
import bunsan.returnz.persist.entity.Member;
import bunsan.returnz.persist.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenProvider jwtTokenProvider;

	public Member signup(SignupRequest signupRequest) {
		// 아이디 중복
		if (!checkUniqueUsername(signupRequest.getUsername())) {
			throw new ConflictException("이미 존재하는 아이디입니다.");
		}
		// 닉네임 중복
		if (!checkUniqueNickname(signupRequest.getNickname())) {
			throw new ConflictException("이미 존재하는 닉네임입니다.");
		}
		confirmPassword(signupRequest.getPassword(), signupRequest.getPasswordConfirmation());

		// 비밀번호 인코딩
		String rawPassword = signupRequest.getPassword();
		String encPassword = passwordEncoder.encode(rawPassword);
		signupRequest.setPassword(encPassword);
		return memberRepository.save(signupRequest.toEntity());

	}

	public Boolean checkUniqueUsername(String username) {
		return !memberRepository.existsMemberByUsername(username);
	}

	public Boolean checkUniqueNickname(String nickname) {
		return !memberRepository.existsMemberByNickname(nickname);
	}

	// 비번, 비번확인 일치 여부
	private void confirmPassword(String password, String passwordConfirmation) {
		if (!password.equals(passwordConfirmation)) {
			throw new BadRequestException("비밀번호 확인이 일치하지 않습니다.");
		}
	}

	public TokenInfo login(String username, String password) {
		Member selectedMember = getMemberbyUsername(username);
		checkPasswordMatch(selectedMember, password);

		// exception 안 났으면 토큰 발행
		// 1. Login ID/PW 를 기반으로 Authentication 객체 생성
		// 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
		log.info("11");
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
			password);

		log.info("22");
		// 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
		// authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
		log.info("33");

		// 3. 인증 정보를 기반으로 JWT 토큰 생성
		return jwtTokenProvider.generateToken(authentication);
		// log.info("44");
	}

	private void checkPasswordMatch(Member member, String password) {
		if (!passwordEncoder.matches(password, member.getPassword())) {
			throw new BadRequestException("비밀번호가 다릅니다.");
		}
	}

	private Member getMemberbyUsername(String username) {
		Member member = memberRepository.findByUsername(username)
			.orElseThrow(() -> new NotFoundException("회원이 존재하지 않습니다."));
		return member;
	}
}
