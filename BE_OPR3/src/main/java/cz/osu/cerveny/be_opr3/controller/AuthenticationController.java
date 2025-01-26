package cz.osu.cerveny.be_opr3.controller;

import cz.osu.cerveny.be_opr3.controller.response.LoginResponse;
import cz.osu.cerveny.be_opr3.service.dto.user.UserCreateDTO;
import cz.osu.cerveny.be_opr3.service.dto.user.UserDTO;
import cz.osu.cerveny.be_opr3.service.dto.user.UserLoginDTO;
import cz.osu.cerveny.be_opr3.service.impl.AuthenticationService;
import cz.osu.cerveny.be_opr3.service.impl.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
@Tag(name = "AUTHENTICATION", description = "Operations about authentication")
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    @Operation(
            summary = "Register a new user",
            description = "Register a new user",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User registered", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @PostMapping("/signup")
    public ResponseEntity<UserDTO> register(@RequestBody UserCreateDTO userCreateDTO){
        return ResponseEntity.ok(authenticationService.signup(userCreateDTO));
    }

    @Operation(
            summary = "Authenticate a user",
            description = "Authenticate a user",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User authenticated", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "401", description = "Invalid credentials", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody UserLoginDTO userLoginDTO) {
        var authenticatedUser = authenticationService.authenticate(userLoginDTO);
        String token = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse("Login successful", token);
        return ResponseEntity.ok(loginResponse);
    }

    @Operation(
            summary = "Get current authenticated user",
            description = "Get current authenticated user",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User found", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "404", description = "User not found", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @GetMapping("/currentUser")
    public ResponseEntity<UserDTO> getCurrentUser() {
        return ResponseEntity.ok(authenticationService.getCurrentUser());
    }
}