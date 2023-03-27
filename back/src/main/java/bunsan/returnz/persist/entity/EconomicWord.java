package bunsan.returnz.persist.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

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
	@Lob
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
