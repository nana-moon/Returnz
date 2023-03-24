package bunsan.returnz.domain.game.enums;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;

public class ThemeConverter implements AttributeConverter<Theme, String> {
	@Override
	public String convertToDatabaseColumn(Theme attribute) {
		if (attribute == null) {
			return null;
		}
		return attribute.getTheme();
	}

	@Override
	public Theme convertToEntityAttribute(String dbData) {
		return Stream.of(Theme.values())
			.filter(t -> t.getTheme() .equals(dbData))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}
}
