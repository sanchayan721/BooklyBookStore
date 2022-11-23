package com.brainfeed.bookly.services;

import java.util.List;

import com.brainfeed.bookly.model.User;

public interface UserService {
    
    public User addUser(User user);

    public List<User> getUsers();

    public User getUserById(Long userId);

    public User updateUser(Long userId, User user);

    public void deleteUser(Long userId);
}
