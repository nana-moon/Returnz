package bunsan.returnz.domain.member.enums;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class ProfileIconConverter  implements AttributeConverter<ProfileIcon,String> {
	@Override
	public String convertToDatabaseColumn(ProfileIcon type) {
		if (type == null) {
			return null;
		}
		return type.getCode();
	}

	@Override
	public ProfileIcon convertToEntityAttribute(String code) {
		if (code == null) {
			return null;
		}
		return Stream.of(ProfileIcon.values())
			.filter(c -> c.getCode().equals(code))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}
}
