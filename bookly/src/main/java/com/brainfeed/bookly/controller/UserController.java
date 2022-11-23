package com.brainfeed.bookly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.brainfeed.bookly.model.User;
import com.brainfeed.bookly.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping(value="/user")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        return new ResponseEntity<User>(userService.addUser(user), HttpStatus.CREATED);
    }

    @GetMapping(value="/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }
    
    @GetMapping(value="/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        return new ResponseEntity<User>(userService.getUserById(Long.parseLong(userId)), HttpStatus.OK);
    }

    @PutMapping(value = "/users/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable String userId, @RequestBody User user) {
        return new ResponseEntity<User>(userService.updateUser(Long.parseLong(userId), user), HttpStatus.OK);
    }
}
