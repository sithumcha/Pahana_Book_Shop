package com.Pahana_edu.Backend.service;

import com.Pahana_edu.Backend.entity.User;
import com.Pahana_edu.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Registration logic
    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists.");
        }
        return userRepository.save(user); // Save to DB
    }

    // Login logic
    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found."));
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials.");
        }
        return user;
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update user details
    public User updateUser(String username, User userDetails) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found."));

        // Update fields
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setEmail(userDetails.getEmail());
        // Add any other fields you need to update

        return userRepository.save(user);
    }

    // Delete user
    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found."));
        userRepository.delete(user);
    }
}
