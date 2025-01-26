package cz.osu.cerveny.be_opr3.controller;

import cz.osu.cerveny.be_opr3.controller.response.LoginResponse;
import cz.osu.cerveny.be_opr3.service.dto.user.UserCreateDTO;
import cz.osu.cerveny.be_opr3.service.dto.user.UserDTO;
import cz.osu.cerveny.be_opr3.service.dto.user.UserLoginDTO;
import cz.osu.cerveny.be_opr3.service.impl.AuthenticationService;
import cz.osu.cerveny.be_opr3.service.impl.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> register(@RequestBody UserCreateDTO userCreateDTO){
        return ResponseEntity.ok(authenticationService.signup(userCreateDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody UserLoginDTO userLoginDTO) {
        var authenticatedUser = authenticationService.authenticate(userLoginDTO);
        String token = jwtService.generateToken(authenticatedUser);

        // Return the token directly in the response
        LoginResponse loginResponse = new LoginResponse("Login successful", token);
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/currentUser")
    public ResponseEntity<UserDTO> getCurrentUser() {
        return ResponseEntity.ok(authenticationService.getCurrentUser());
    }
}