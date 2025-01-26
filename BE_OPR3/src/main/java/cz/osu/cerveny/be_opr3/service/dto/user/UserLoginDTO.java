package cz.osu.cerveny.be_opr3.service.dto.user;

import lombok.Data;

@Data
public class UserLoginDTO {
    private String email;
    private String password;
}
