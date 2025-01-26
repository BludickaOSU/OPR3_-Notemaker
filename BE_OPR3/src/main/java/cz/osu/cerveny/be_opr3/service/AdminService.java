package cz.osu.cerveny.be_opr3.service;

import cz.osu.cerveny.be_opr3.service.dto.user.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminService {

    Page<UserDTO> getAllUsers(Pageable pageable);
    UserDTO getUser(Long id);
    void deleteUser(Long id);

}
