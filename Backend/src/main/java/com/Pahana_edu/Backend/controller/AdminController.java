package com.Pahana_edu.Backend.controller;

import com.Pahana_edu.Backend.entity.Admin;
import com.Pahana_edu.Backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Register Admin
    @PostMapping("/register")
    public String registerAdmin(@RequestBody Admin admin) {
        boolean isRegistered = adminService.registerAdmin(admin);
        if (isRegistered) {
            return "Admin registered successfully!";
        }
        return "Registration failed: Username already exists.";
    }

    // Login Admin
    @PostMapping("/login")
    public String loginAdmin(@RequestBody Admin admin) {
        boolean isLoggedIn = adminService.authenticateAdmin(admin);
        if (isLoggedIn) {
            return "Login successful!";
        }
        return "Invalid username or password.";
    }

    // Update Admin details
    @PutMapping("/update/{username}")
    public String updateAdmin(@PathVariable String username, @RequestBody Admin admin) {
        boolean isUpdated = adminService.updateAdmin(username, admin);
        if (isUpdated) {
            return "Admin details updated successfully!";
        }
        return "Update failed: Admin not found.";
    }

    // Delete Admin
    @DeleteMapping("/delete/{username}")
    public String deleteAdmin(@PathVariable String username) {
        boolean isDeleted = adminService.deleteAdmin(username);
        if (isDeleted) {
            return "Admin deleted successfully!";
        }
        return "Deletion failed: Admin not found.";
    }
    // Get all Admins
    @GetMapping("/all")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }
}
