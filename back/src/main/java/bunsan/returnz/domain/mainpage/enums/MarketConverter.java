package bunsan.returnz.domain.mainpage.enums;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;

import bunsan.returnz.domain.game.enums.Theme;

public class MarketConverter implements AttributeConverter<Market, String> {
	@Override
	public String convertToDatabaseColumn(Market attribute) {
		if (attribute == null) {
			return null;
		}
		return attribute.getMarket();
	}

	@Override
	public Market convertToEntityAttribute(String dbData) {
		return Stream.of(Market.values())
			.filter(t -> t.getMarket().equals(dbData))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}
}
