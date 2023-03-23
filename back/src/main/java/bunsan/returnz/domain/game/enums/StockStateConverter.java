package bunsan.returnz.domain.game.enums;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;

public class StockStateConverter implements AttributeConverter<StockState, String> {
	@Override
	public String convertToDatabaseColumn(StockState attribute) {
		if (attribute == null) {
			return null;
		}
		return attribute.getState();
	}

	@Override
	public StockState convertToEntityAttribute(String dbData) {
		return Stream.of(StockState.values())
			.filter(t -> t.getState().equals(dbData))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}
}
