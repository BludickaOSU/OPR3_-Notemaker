package cz.osu.cerveny.be_opr3.service;


import cz.osu.cerveny.be_opr3.service.dto.user.UserDTO;
import cz.osu.cerveny.be_opr3.service.dto.user.UserUpdateDTO;


public interface UserService {
    void deleteUser(Long id);
    UserDTO getUser();
    UserDTO updateUser(Long id, UserUpdateDTO userUpdateDto);


}
