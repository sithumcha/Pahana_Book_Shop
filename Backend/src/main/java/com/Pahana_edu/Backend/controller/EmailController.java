//package com.Pahana_edu.Backend.controller;
//
//
//
//import com.Pahana_edu.Backend.service.EmailService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.io.IOException;
//
//@RestController
//@RequestMapping("api/v1/")
//public class EmailController {
//
//    @Autowired
//    private EmailService emailService;
//
//    @PostMapping("/sendemail")
//    public String sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String body) {
//        try {
//            return emailService.sendEmail(to, subject, body);  // Send the email and return the response
//        } catch (IOException e) {
//            return "Error sending email: " + e.getMessage();  // Return an error message if something goes wrong
//        }
//    }
//}


package com.Pahana_edu.Backend.controller;

import com.Pahana_edu.Backend.entity.EmailRequest;
import com.Pahana_edu.Backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendemail")
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            // Send the email using the service
            return emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
        } catch (IOException e) {
            // Return error message if something goes wrong
            return "Error sending email: " + e.getMessage();
        }
    }
}
