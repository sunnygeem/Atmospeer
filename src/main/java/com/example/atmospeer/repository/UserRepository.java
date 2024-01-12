package com.example.atmospeer.repository;

import com.example.atmospeer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}