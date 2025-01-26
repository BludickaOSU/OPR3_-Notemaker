package cz.osu.cerveny.be_opr3.service.dto.user;

import lombok.Data;

@Data
public class UserCreateDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String password;
}
