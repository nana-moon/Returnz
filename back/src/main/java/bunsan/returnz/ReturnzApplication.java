package bunsan.returnz;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;

// TODO: 2023-03-29 프론트 서버에 맞게 CrossOrigin 변경

@SpringBootApplication
@EnableScheduling
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReturnzApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReturnzApplication.class, args);
	}

	@PostConstruct
	public void started() {
		// timezone UTC 셋팅
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}
}
