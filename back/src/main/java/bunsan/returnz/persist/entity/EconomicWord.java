package bunsan.returnz.persist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EconomicWord {
	@Id
	private Integer id;
	private String topic;
	private String word;
	@Column(length = 10000)
	private String description;

	public TodayWord toTodayWord(EconomicWord economicWord) {
		return TodayWord.builder()
			.id(economicWord.getId())
			.topic(economicWord.getTopic())
			.word(economicWord.getWord())
			.description(economicWord.getDescription())
			.build();
	}
}
