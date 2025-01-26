package cz.osu.cerveny.be_opr3.service.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

@Data
@Validated
public class UserLoginDTO {
    @NotBlank(message = "The email must not be blank")
    private String email;
    @NotBlank(message = "The password must not be blank")
    private String password;
}
