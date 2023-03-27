package bunsan.returnz.persist.entity;

import java.util.StringTokenizer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import bunsan.returnz.domain.mainpage.dto.TodayWordDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodayWord {
	@Id
	@Column(name = "TODAY_WORD_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String topic;
	private String word;
	@Column(length = 10000)
	private String description;

	public TodayWordDto toDto() {
		String description = this.description;
		StringTokenizer st = new StringTokenizer(description, ".");
		String shortDes = "";
		int cnt = 0;
		while (cnt <= 4) {
			if (st.hasMoreTokens()) {
				shortDes += st.nextToken() + ".";
			}
			cnt++;
		}

		return TodayWordDto.builder()
			.keyWord(this.word)
			.description(shortDes)
			.build();
	}
}
