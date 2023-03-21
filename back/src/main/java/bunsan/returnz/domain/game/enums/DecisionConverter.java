package bunsan.returnz.domain.game.enums;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;

public class DecisionConverter
	implements AttributeConverter<Decision, String> {

	@Override
	public String convertToDatabaseColumn(Decision attribute) {
		if(attribute == null){
			return null;
		}
		return attribute.getDecision();
	}

	@Override
	public Decision convertToEntityAttribute(String decision) {
		return Stream.of(Decision.values())
			.filter(t-> t.getDecision().equals(decision))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}
}
