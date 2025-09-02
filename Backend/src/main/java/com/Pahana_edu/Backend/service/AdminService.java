package com.Pahana_edu.Backend.service;

import com.Pahana_edu.Backend.entity.Admin;
import com.Pahana_edu.Backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Register Admin
    public boolean registerAdmin(Admin admin) {
        Optional<Admin> existingAdmin = adminRepository.findByUsername(admin.getUsername());
        if (existingAdmin.isPresent()) {
            return false; // Admin with this username already exists
        }
        adminRepository.save(admin);
        return true;
    }

    // Authenticate Admin (login)
    public boolean authenticateAdmin(Admin admin) {
        Optional<Admin> existingAdmin = adminRepository.findByUsername(admin.getUsername());
        return existingAdmin.isPresent() && existingAdmin.get().getPassword().equals(admin.getPassword());
    }

    // Update Admin details
    public boolean updateAdmin(String username, Admin updatedAdmin) {
        Optional<Admin> existingAdmin = adminRepository.findByUsername(username);
        if (existingAdmin.isPresent()) {
            Admin admin = existingAdmin.get();
            admin.setPassword(updatedAdmin.getPassword()); // Update password
            adminRepository.save(admin);
            return true;
        }
        return false; // Admin not found
    }

    // Delete Admin
    public boolean deleteAdmin(String username) {
        Optional<Admin> existingAdmin = adminRepository.findByUsername(username);
        if (existingAdmin.isPresent()) {
            adminRepository.delete(existingAdmin.get());
            return true;
        }
        return false; // Admin not found
    }

    // Get all Admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll(); // Returns a list of all admins
    }
}
