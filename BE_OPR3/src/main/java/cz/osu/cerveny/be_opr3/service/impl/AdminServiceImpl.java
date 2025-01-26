package cz.osu.cerveny.be_opr3.service.impl;

import cz.osu.cerveny.be_opr3.exception.NotFoundException;
import cz.osu.cerveny.be_opr3.repository.UserRepository;
import cz.osu.cerveny.be_opr3.service.AdminService;
import cz.osu.cerveny.be_opr3.service.dto.user.UserDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<UserDTO> getAllUsers(Pageable pageable) {
        return userRepository
                .findAll(pageable)
                .map(user -> modelMapper
                        .map(user, UserDTO.class));
    }

    @Override
    public UserDTO getUser(Long id) {
        return modelMapper
                .map(userRepository
                        .findById(id)
                        .orElseThrow( () ->
                                new NotFoundException("User with this id not found"))
                        , UserDTO.class);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
