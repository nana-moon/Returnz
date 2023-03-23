package bunsan.returnz.domain.game.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bunsan.returnz.domain.game.dto.RequestSettingGame;

@RestController
@RequestMapping
@CrossOrigin
public class GameController {
	@PostMapping("/init")
	public ResponseEntity<?> settingGame(@RequestBody RequestSettingGame requestSettingGame){
		// game id return
		return null;
	}

}
