package com.Pahana_edu.Backend.service;

import com.Pahana_edu.Backend.entity.Admin;
import com.Pahana_edu.Backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    // Authenticate Admin
    public boolean authenticateAdmin(Admin admin) {
        Optional<Admin> existingAdmin = adminRepository.findByUsername(admin.getUsername());
        return existingAdmin.isPresent() && existingAdmin.get().getPassword().equals(admin.getPassword());
    }
}
