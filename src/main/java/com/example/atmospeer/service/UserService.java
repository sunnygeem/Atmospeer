package com.example.atmospeer.service;

import com.example.atmospeer.model.User;
import com.example.atmospeer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    //모든 회원 정보
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //회원 가입
    public User registerUser(User newUser) {
        return userRepository.save(newUser);
    }

    //로그인
    public boolean loginUser(String id, String password) {
        return userRepository.findById(id)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);
    }
}
