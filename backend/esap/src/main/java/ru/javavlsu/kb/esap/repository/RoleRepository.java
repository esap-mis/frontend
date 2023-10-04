package ru.javavlsu.kb.esap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.javavlsu.kb.esap.model.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);
    
    boolean existsByName(String name);
}
