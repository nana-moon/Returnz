package bunsan.returnz.domain.member.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import bunsan.returnz.domain.member.dto.SignupRequest;
import bunsan.returnz.global.advice.exception.BadRequestException;
import bunsan.returnz.global.advice.exception.ConflictException;
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

	public Member signup(SignupRequest signupRequest) {
		// 아이디 중복
		if (!checkUniqueUsername(signupRequest.getUsername())) {
			throw new ConflictException("이미 존재하는 아이디입니다.");
		}
		// 닉네임 중복
		if (!checkUniqueNickname(signupRequest.getNickname())) {
			throw new ConflictException("이미 존재하는 닉네임입니다.");
		}
		confirmPassword(signupRequest.getPassword(),signupRequest.getPasswordConfirmation());

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
}
