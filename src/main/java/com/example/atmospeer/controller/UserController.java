package com.example.atmospeer.controller;

import com.example.atmospeer.model.User;
import com.example.atmospeer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //모든 사용자
    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getAllUsers();
    }

    //회원 가입
    @PostMapping("/register")
    public User registerUser(@RequestBody User newUser) {
        return userService.registerUser(newUser);
    }

    //로그인
    @GetMapping("/login")
    public boolean loginUser(@RequestParam String id, @RequestParam String password) {
        return userService.loginUser(id, password);
    }
}