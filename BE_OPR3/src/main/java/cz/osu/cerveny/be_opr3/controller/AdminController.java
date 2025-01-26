package cz.osu.cerveny.be_opr3.controller;

import cz.osu.cerveny.be_opr3.service.AdminService;
import cz.osu.cerveny.be_opr3.service.dto.user.UserDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/admins")
@RequiredArgsConstructor
@Tag(name = "ADMINS", description = "Operations about admins")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;


    @Operation(
            summary = "Get all users",
            description = "Get all users with pagination",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Users found", useReturnTypeSchema = true)
            }
    )
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<UserDTO> getAllUsers(Pageable pageable){
        return adminService.getAllUsers(pageable);
    }

    @Operation(
            summary = "Get user by id",
            description = "Get user by his id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User found", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "404", description = "User not found",content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO getUser(@PathVariable Long id){
        return adminService.getUser(id);
    }

    @Operation(
            summary = "Delete user by his id",
            description = "Delete user by his id",
            responses = {
                    @ApiResponse(responseCode = "204", description = "User deleted", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "404", description = "User with this id not found",content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id){
        adminService.deleteUser(id);
    }
}
