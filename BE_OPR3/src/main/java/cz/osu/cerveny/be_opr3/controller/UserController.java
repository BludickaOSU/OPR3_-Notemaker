package cz.osu.cerveny.be_opr3.controller;

import cz.osu.cerveny.be_opr3.service.UserService;
import cz.osu.cerveny.be_opr3.service.dto.user.UserDTO;
import cz.osu.cerveny.be_opr3.service.dto.user.UserUpdateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "USERS", description = "Operations about users")
public class UserController {

    private final UserService userService;


    @Operation(
            summary = "Get user by id",
            description = "Get user by his id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User found", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "404", description = "User not found",content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDTO> getUser(){
        return ResponseEntity.ok(userService.getUser());
    }

    @Operation(
            summary = "Update user by his id",
            description = "Update user by his id",
            responses = {
                    @ApiResponse(responseCode = "202", description = "User updated", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "404", description = "User with this id not found",content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id ,@RequestBody UserUpdateDTO userUpdateDTO){
        return ResponseEntity.ok(userService.updateUser(id,userUpdateDTO));
    }

    @Operation(
            summary = "Delete user by his id",
            description = "Delete user by his id",
            responses = {
                    @ApiResponse(responseCode = "204", description = "User deleted"),
                    @ApiResponse(responseCode = "404", description = "User not found")
            }
    )
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id ){
        userService.deleteUser(id);
    }



}
