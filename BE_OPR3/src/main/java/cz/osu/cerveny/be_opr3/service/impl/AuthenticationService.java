package cz.osu.cerveny.be_opr3.service.impl;

import cz.osu.cerveny.be_opr3.exception.NotFoundException;
import cz.osu.cerveny.be_opr3.model.entity.User;
import cz.osu.cerveny.be_opr3.model.enums.Role;
import cz.osu.cerveny.be_opr3.repository.UserRepository;
import cz.osu.cerveny.be_opr3.service.dto.user.UserCreateDTO;
import cz.osu.cerveny.be_opr3.service.dto.user.UserDTO;
import cz.osu.cerveny.be_opr3.service.dto.user.UserLoginDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper modelMapper;

    public UserDTO signup(UserCreateDTO input) {
        var user = new User();
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setRole(Role.USER);
        modelMapper.map(input, user);
        return modelMapper.map(userRepository.save(user), UserDTO.class);
    }

    public User authenticate(UserLoginDTO input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        return userRepository.findByEmail(input.getEmail())
                        .orElseThrow( () -> new NotFoundException("User not found"));
    }

    public UserDTO getCurrentUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var user = (User) authentication.getPrincipal();
        return modelMapper.map(user, UserDTO.class);
    }

}
