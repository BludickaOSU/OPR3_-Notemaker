package cz.osu.cerveny.be_opr3.controller.response;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginResponse {
    @NotBlank(message = "The message must not be blank")
    private String message;
    @NotBlank(message = "The token must not be blank")
    private String token;

    public LoginResponse(String message, String token) {
        this.message = message;
        this.token = token;
    }


}