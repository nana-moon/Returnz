package bunsan.returnz.domain.member.enums;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class MemberStateConverter implements AttributeConverter<MemberState, String> {
	@Override
	public String convertToDatabaseColumn(MemberState type) {
		if (type == null) {
			return null;
		}
		return type.getCode();
	}

	@Override
	public MemberState convertToEntityAttribute(String code) {
		if (code == null) {
			return null;
		}
		return Stream.of(MemberState.values())
			.filter(c -> c.getCode().equals(code))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}
}
