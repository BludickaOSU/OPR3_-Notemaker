package cz.osu.cerveny.be_opr3.service.impl;

import cz.osu.cerveny.be_opr3.exception.NotFoundException;
import cz.osu.cerveny.be_opr3.model.entity.User;
import cz.osu.cerveny.be_opr3.repository.UserRepository;
import cz.osu.cerveny.be_opr3.service.UserService;
import cz.osu.cerveny.be_opr3.service.dto.user.UserDTO;
import cz.osu.cerveny.be_opr3.service.dto.user.UserUpdateDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    public static final String USER_NOT_FOUND_MESSAGE = "User with this id not found";
    private final PasswordEncoder passwordEncoder;

    @Override
    public void deleteUser(Long id) {
        String currentUsername = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User currentUser = userRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
        if (!currentUser.getId().equals(id)) {
            throw new AccessDeniedException("You can't delete other user's data");
        } else {
            userRepository.deleteById(id);
        }
    }

    @Override
    public UserDTO getUser() {
        String currentUsername = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User currentUser = userRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
        return modelMapper.map(currentUser, UserDTO.class);
    }

    @Override
    public UserDTO updateUser(Long id, UserUpdateDTO userUpdateDto) {
        String currentUsername = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User currentUser = userRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
        if (!currentUser.getId().equals(id)) {
            throw new AccessDeniedException("You can't update other user's data");
        }
        var user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
        modelMapper.map(userUpdateDto, user);
        return modelMapper.map(userRepository.save(user), UserDTO.class);
    }
}