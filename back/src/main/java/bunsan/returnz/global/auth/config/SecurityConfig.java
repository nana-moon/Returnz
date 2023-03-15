package bunsan.returnz.global.auth.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import bunsan.returnz.global.auth.service.JwtTokenProvider;
import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtTokenProvider jwtTokenProvider;
	@Autowired
	DataSource dataSource;

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
			// rest api만 사용
			.httpBasic().disable()
			.cors().and()
			.csrf().disable()
			// iframe 요소를 통한 전송 허용
			.headers()
			.frameOptions().sameOrigin()
			.and()
			//
			.authorizeRequests()
			//
			.antMatchers("/api/members/signup", "/api/members/login").permitAll()
			// .antMatchers(HttpMethod.PUT,"/boards/gif/{gifId}").authenticated()
			// .antMatchers(HttpMethod.DELETE,"/boards/gif/{boardId}").authenticated()
			// .antMatchers(HttpMethod.DELETE,"/boards/{boardId}").authenticated()
			// .antMatchers(HttpMethod.POST,"/boards/{boardId}").authenticated()
			// .antMatchers(HttpMethod.PUT,"/boards/{boardId}").authenticated()
			// .antMatchers(HttpMethod.POST,"/temp").authenticated()
			// .antMatchers(HttpMethod.GET,"/temp/all").hasAnyAuthority("ROLE_MANAGER")
			// .antMatchers(HttpMethod.PUT,"/temp/{tempId}").hasAnyAuthority("ROLE_MANAGER")
			// .antMatchers(HttpMethod.DELETE,"/temp/{tempId}").hasAnyAuthority("ROLE_MANAGER")
			// .antMatchers(HttpMethod.POST, "/comments/**").authenticated()
			// .antMatchers(HttpMethod.DELETE,"/comments/**").authenticated()
			.anyRequest().permitAll()
			//
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // jwt사용하는 경우 씀
			.and()
			/**
			 *
			 */
			.addFilterBefore(new JwtFilter(jwtTokenProvider),
				UsernamePasswordAuthenticationFilter.class)
			.csrf() // 추가
			.ignoringAntMatchers("/h2-console/**").disable()
			.build(); // 추가
	}

	// Security 무시하기
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/h2-console/**");
	}

}
