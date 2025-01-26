package cz.osu.cerveny.be_opr3.repository;

import cz.osu.cerveny.be_opr3.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
