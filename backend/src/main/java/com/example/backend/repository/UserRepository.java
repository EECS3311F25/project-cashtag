package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.User;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    
}
