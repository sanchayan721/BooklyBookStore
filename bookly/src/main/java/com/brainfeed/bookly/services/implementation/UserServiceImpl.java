package com.brainfeed.bookly.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brainfeed.bookly.exception.FailedOperationException;
import com.brainfeed.bookly.exception.ResourceAlreadyExistsException;
import com.brainfeed.bookly.exception.ResourceNotFoundException;
import com.brainfeed.bookly.model.User;
import com.brainfeed.bookly.repository.UserRepository;
import com.brainfeed.bookly.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {

        String username = user.getUsername();
        String userEmail = user.getEmail();

        List<User> foundByUsername = userRepository.findByUsername(username);
        List<User> foundByEmail = userRepository.findByEmail(userEmail);

        if (foundByUsername.size() > 0) {
            throw new ResourceAlreadyExistsException("username", username);
        } else if (foundByEmail.size() > 0) {
            throw new ResourceAlreadyExistsException("Email", userEmail);
        } else {
            System.out.println(user);
            userRepository.save(user);
            return user;
        }
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userid", userId));
    }

    @Override
    public User updateUser(Long userId, User user) {
        User targetUser = getUserById(userId);

        targetUser.setName(user.getName());
        targetUser.setUsername(user.getUsername());
        targetUser.setEmail(user.getEmail());

        try {
            userRepository.save(targetUser);
            return targetUser;
        } catch (Exception e) {
            throw new FailedOperationException("Update");
        }
    }

    @Override
    public void deleteUser(Long userId) {
        // TODO Auto-generated method stub
        
    }

}
