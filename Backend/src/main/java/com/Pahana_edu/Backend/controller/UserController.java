package com.Pahana_edu.Backend.controller;

import com.Pahana_edu.Backend.entity.User;
import com.Pahana_edu.Backend.entity.LoginRequest;
import com.Pahana_edu.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/auth/")
public class UserController {

    @Autowired
    private UserService userService;

    // Registration endpoint (with profile image upload)
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestParam("username") String username,
                                         @RequestParam("password") String password,
                                         @RequestParam("email") String email,
                                         @RequestParam("contactNumber") String contactNumber,
                                         @RequestParam("address") String address,
                                         @RequestParam("gender") String gender,
                                         @RequestParam("birthdate") String birthdate,
                                         @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {
        try {
            User user = new User(username, password, email, contactNumber, address, gender, birthdate, null);
            User registeredUser = userService.registerUser(user, profileImage); // Passing profile image
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // Handle error
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null); // Internal server error (file issue)
        }
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(null); // Unauthorized error
        }
    }

    // Get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Update user details (with profile image upload)
    @PutMapping("/users/{username}")
    public ResponseEntity<User> updateUser(@PathVariable String username,
                                           @RequestParam("username") String newUsername,
                                           @RequestParam("password") String newPassword,
                                           @RequestParam("email") String newEmail,
                                           @RequestParam("contactNumber") String newContactNumber,
                                           @RequestParam("address") String newAddress,
                                           @RequestParam("gender") String newGender,
                                           @RequestParam("birthdate") String newBirthdate,
                                           @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {
        try {
            User userDetails = new User(newUsername, newPassword, newEmail, newContactNumber, newAddress, newGender, newBirthdate, null);
            User updatedUser = userService.updateUser(username, userDetails, profileImage); // Passing profile image
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null); // Not Found
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null); // Internal server error (file issue)
        }
    }

    // Delete user
    @DeleteMapping("/users/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        try {
            userService.deleteUser(username);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).build(); // Not Found
        }
    }
}
