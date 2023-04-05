package bunsan.returnz.persist.entity;

import javax.annotation.concurrent.Immutable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Immutable
@Table(name = "riemann_theme_company")
@Getter
public class RiemannThemeCompany {
	@Id
	private String companyCode;
}
