package bunsan.returnz.persist.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import bunsan.returnz.domain.member.enums.MemberState;
import bunsan.returnz.domain.member.enums.MemberStateConverter;
import bunsan.returnz.domain.member.enums.ProfileIcon;
import bunsan.returnz.domain.member.enums.ProfileIconConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author nana-moon
 */
@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member implements UserDetails {
	@Id
	@Column(name = "MEMBER_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, length = 100, unique = true)
	private String username; //아이디

	@Column(nullable = false, length = 100)
	private String password;
	@Column(nullable = false, length = 100)
	private String nickname;
	@Builder.Default
	private LocalDateTime enrollDate = LocalDateTime.now();
	@Builder.Default
	@Convert(converter =  MemberStateConverter.class)
	private MemberState state = MemberState.OFFLINE;

	// 누적 게임 횟수
	@Builder.Default
	private Long gameCount = 0L;

	// 연승 횟수
	@Builder.Default
	private Long streakCount = 0L;

	// 누적 수익률
	@Builder.Default
	private Long accumulatedReturn = 0L;
	/**
	 * 수정 필요
	 */
	@Builder.Default
	@ManyToMany
	@JoinTable(
		joinColumns = @JoinColumn(name = "member_id"),
		inverseJoinColumns = @JoinColumn(name = "friend_id"))
	private List<Member> friends = new ArrayList<>();

	// @ManyToMany
	// @Builder.Default
	// @Convert(converter =  ProfileIconConverter.class)
	// private List<ProfileIcon> permittedProfileList = new ArrayList<ProfileIcon>(){{
	// 	add(ProfileIcon.ONE);
	// }};
	@Builder.Default
	@Convert(converter = ProfileIconConverter.class)
	private ProfileIcon profileIcon = ProfileIcon.ONE;

	// roles
	@ElementCollection(fetch = FetchType.EAGER)
	@Builder.Default
	private List<String> roles = new ArrayList<String>() {
		{
			add("USER");
		}
	};

	// 계정 공개 여부
	@Builder.Default
	private boolean accountNonLocked = true;

	// 계정 활성화 여부
	@Builder.Default
	private boolean enabled = true;

	// 계정 탈퇴 여부
	@Builder.Default
	private boolean accountNonExpired = true;

	//============================== 메서드 영역 ====================================
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream()
			.map(SimpleGrantedAuthority::new)
			.collect(Collectors.toList());
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled;
	}

}
