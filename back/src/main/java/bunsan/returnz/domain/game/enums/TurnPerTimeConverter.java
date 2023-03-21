package bunsan.returnz.domain.game.enums;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class TurnPerTimeConverter implements AttributeConverter<TurnPerTime, String> {
	@Override
	public String convertToDatabaseColumn(TurnPerTime attribute) {
		if(attribute == null){
			return null;
		}
		return attribute.getTime();
	}

	@Override
	public TurnPerTime convertToEntityAttribute(String time) {
		return Stream.of(TurnPerTime.values())
			.filter(t-> t.getTime().equals(time))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}
}
