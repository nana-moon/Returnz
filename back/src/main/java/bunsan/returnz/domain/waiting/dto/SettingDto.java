package bunsan.returnz.domain.waiting.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.annotation.Nullable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

import bunsan.returnz.domain.game.enums.Theme;
import bunsan.returnz.domain.game.enums.TurnPerTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SettingDto {
	@NotBlank(message = "방 정보를 입력해주세요.")
	private String roomId;
	@NotNull(message = "테마를 입력해주세요.")
	private Theme theme;
	@NotNull(message = "턴 단위를 입력해주세요.")
	private TurnPerTime turnPerTime;
	@Nullable
	@JsonDeserialize(using = LocalDateDeserializer.class)
	private LocalDate startTime;
	@Nullable
	private Integer totalTurn;
}
