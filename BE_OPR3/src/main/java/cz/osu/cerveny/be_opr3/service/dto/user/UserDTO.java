package cz.osu.cerveny.be_opr3.service.dto.user;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private LocalDateTime accountCreated;
    private LocalDateTime accountChanged;


}
