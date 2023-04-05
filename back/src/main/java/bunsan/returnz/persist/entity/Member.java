package bunsan.returnz.persist.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

	// 평균 슈익률
	@Builder.Default
	private Double avgProfit = 0D;

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
	@ElementCollection
	@Builder.Default
	private Set<String> permittedProfiles = new HashSet<>() {
		{
			add(ProfileIcon.ONE.getCode());
		}
	};
	@Builder.Default
	private String profileIcon = ProfileIcon.ONE.getCode();

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

	public boolean isFriend(Member targetMember) {
		List<Member> myFriends = this.getFriends();
		if (myFriends.contains(targetMember)) {
			return true;
		} else {
			return false;
		}
	}

	public void addFriend(Member member) {
		List<Member> myFriends = this.getFriends();
		if (!myFriends.contains(member)) {
			// 첫 친구 추가일 때 프로필 해금
			if (myFriends.size() == 0) {
				this.permittedProfiles.add(ProfileIcon.TWELVE.getCode());
			}
			myFriends.add(member);

		}
	}

	public void changeState(MemberState state) {
		this.state = state;
	}

	public void deleteFriend(Member friend) {
		this.getFriends().remove(friend);
	}

	// 평균 수익률 계산
	public void setAvgProfit() {
		this.avgProfit = (double)this.accumulatedReturn / this.gameCount;
	}

	// 누적 수익률 증가
	public void addAccReturn(Long gameReturn) {
		this.accumulatedReturn += gameReturn;
	}

	// 게임 횟수 증가
	public void addGameCount() {
		this.gameCount++;
	}

	public void changeNickname(String newNickname) {
		this.nickname = newNickname;
	}

	public void changeProfile(String newProfile) {
		this.profileIcon = newProfile;
	}

	public String addProfile(String newProfile) {
		this.permittedProfiles.add(newProfile);
		return newProfile;
	}

	public void addStreakCount() {
		this.streakCount++;
	}

	public void setStreakCountZero() {
		this.streakCount = 0L;
	}
}
