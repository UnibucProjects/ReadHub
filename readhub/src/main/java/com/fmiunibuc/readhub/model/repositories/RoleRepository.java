package com.fmiunibuc.readhub.model.repositories;


import com.fmiunibuc.readhub.model.ERole;
import com.fmiunibuc.readhub.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}