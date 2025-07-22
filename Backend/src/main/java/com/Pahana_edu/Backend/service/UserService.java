//package com.backend.pahana_edu.service;
//
//import com.backend.pahana_edu.entity.User;
//import com.backend.pahana_edu.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.List;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    private final String uploadDir = "C:/uploads/";  // Directory to store images (change as needed)
//
//    // Method to register user with profile picture
//    public User registerUser(User user, MultipartFile profileImage) throws IOException {
//        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
//            throw new RuntimeException("Username already exists.");
//        }
//
//        // Save the profile image to the directory and set its path
//        String imagePath = saveProfileImage(profileImage);
//        user.setProfileImagePath(imagePath);
//
//        return userRepository.save(user); // Save to DB
//    }
//
//    // Save the profile picture to a directory and return the file path
//    private String saveProfileImage(MultipartFile profileImage) throws IOException {
//        if (profileImage.isEmpty()) {
//            throw new RuntimeException("No image file uploaded.");
//        }
//
//        // Create a unique file name
//        String fileName = System.currentTimeMillis() + "_" + profileImage.getOriginalFilename();
//        Path path = Paths.get(uploadDir, fileName);
//
//        // Save the image to the specified directory
//        Files.createDirectories(path.getParent()); // Create directories if they don't exist
//        Files.write(path, profileImage.getBytes());
//
//        return path.toString();  // Return the path of the saved image
//    }
//
//    // Method to update user details, including updating the profile image
//    public User updateUser(String username, User userDetails, MultipartFile profileImage) throws IOException {
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found."));
//
//        // Update fields
//        user.setUsername(userDetails.getUsername());
//        user.setPassword(userDetails.getPassword());
//        user.setEmail(userDetails.getEmail());
//        user.setContactNumber(userDetails.getContactNumber());
//        user.setAddress(userDetails.getAddress());
//        user.setGender(userDetails.getGender());
//        user.setBirthdate(userDetails.getBirthdate());
//
//        // If there's a new profile image, save it and update the path
//        if (profileImage != null && !profileImage.isEmpty()) {
//            String imagePath = saveProfileImage(profileImage);
//            user.setProfileImagePath(imagePath);
//        }
//
//        return userRepository.save(user);
//    }
//
//    // Get all users
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    // Delete user
//    public void deleteUser(String username) {
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found."));
//        userRepository.delete(user);
//    }
//
//    // Method to login user by validating username and password
//    public User loginUser(String username, String password) {
//        // Try to find the user by username
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found."));
//
//        // If the passwords don't match, throw exception
//        if (!user.getPassword().equals(password)) {
//            throw new RuntimeException("Invalid credentials.");
//        }
//
//        // Return the user if everything matches
//        return user;
//    }
//}
//
//
//
//




package com.Pahana_edu.Backend.service;

import com.Pahana_edu.Backend.entity.User;
import com.Pahana_edu.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Read the file upload path from application.properties
    @Value("${file.upload-dir}")
    private String uploadDir;

    // Method to register user with profile picture
    public User registerUser(User user, MultipartFile profileImage) throws IOException {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists.");
        }

        // Save the profile image to the directory and set its path
        String imagePath = saveProfileImage(profileImage);
        user.setProfileImagePath(imagePath);

        return userRepository.save(user); // Save to DB
    }

    // Save the profile picture to a directory and return the file path
    private String saveProfileImage(MultipartFile profileImage) throws IOException {
        if (profileImage.isEmpty()) {
            throw new RuntimeException("No image file uploaded.");
        }

        // Create a unique file name based on current timestamp
        String fileName = System.currentTimeMillis() + "_" + profileImage.getOriginalFilename();
        Path path = Paths.get(uploadDir, fileName);

        // Create the directory if it does not exist
        Files.createDirectories(path.getParent()); // Create directories if they don't exist
        Files.write(path, profileImage.getBytes()); // Write file to disk

        return path.toString();  // Return the file path for storing in DB
    }

    // Method to update user details, including updating the profile image
    public User updateUser(String username, User userDetails, MultipartFile profileImage) throws IOException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found."));

        // Update user fields with the provided details
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setEmail(userDetails.getEmail());
        user.setContactNumber(userDetails.getContactNumber());
        user.setAddress(userDetails.getAddress());
        user.setGender(userDetails.getGender());
        user.setBirthdate(userDetails.getBirthdate());

        // If there's a new profile image, save it and update the path
        if (profileImage != null && !profileImage.isEmpty()) {
            String imagePath = saveProfileImage(profileImage);
            user.setProfileImagePath(imagePath);
        }

        return userRepository.save(user);  // Save updated user to DB
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Delete user by username
    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found."));
        userRepository.delete(user);  // Delete user from DB
    }

    // Method to login user by validating username and password
    public User loginUser(String username, String password) {
        // Try to find the user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found."));

        // If passwords don't match, throw exception
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials.");
        }

        // Return the user if everything matches
        return user;
    }
}
