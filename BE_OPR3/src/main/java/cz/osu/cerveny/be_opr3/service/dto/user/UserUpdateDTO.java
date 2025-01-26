package cz.osu.cerveny.be_opr3.service.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

@Data
@Validated
public class UserUpdateDTO {
    @NotBlank(message = "The first name must not be blank")
    private String firstName;
    @NotBlank(message = "The last name must not be blank")
    private String lastName;
}
