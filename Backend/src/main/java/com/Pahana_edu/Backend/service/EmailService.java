//package com.Pahana_edu.Backend.service;
//
//
//
//
//import com.sendgrid.Method;
//import com.sendgrid.Request;
//import com.sendgrid.Response;
//import com.sendgrid.SendGrid;
//import com.sendgrid.helpers.mail.Mail;
//import com.sendgrid.helpers.mail.objects.Content;
//import com.sendgrid.helpers.mail.objects.Email;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//
//@Service
//public class EmailService {
//
//    @Autowired
//    private SendGrid sendGrid;
//
//    public String sendEmail(String to, String subject, String body) throws IOException {
//        System.out.println(to);
//        Email from = new Email("your mail"); // Your sender email
//        Email toEmail = new Email(to); // Recipient's email
//        Content content = new Content("text/plain", body); // Email body
//        Mail mail = new Mail(from, subject, toEmail, content);
//
//        Request request = new Request();
//        try {
//            request.setMethod(Method.POST);
//            request.setEndpoint("mail/send");
//            request.setBody(mail.build());
//
//            // Send the email
//            Response response = sendGrid.api(request);
//            return "Email sending success"; // Return the response body (can be logged or used for further handling)
//        } catch (IOException ex) {
//            throw new IOException("Error sending email: " + ex.getMessage(), ex); // More detailed error handling
//        }
//    }
//}



package com.Pahana_edu.Backend.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {

    @Autowired
    private SendGrid sendGrid;  // SendGrid API client

//    public String sendEmail(String to, String subject, String body) throws IOException {
//        // Sender email address
//        Email from = new Email("sithumchanukasandaruwn2002@gmail.com");  // Replace with your sender email
//        // Recipient's email address
//        Email toEmail = new Email(to);
//        // Email body content
//        Content content = new Content("text/plain", body);
//        // Construct the email
//        Mail mail = new Mail(from, subject, toEmail, content);
//
//        // Prepare the request to send the email
//        Request request = new Request();
//        try {
//            request.setMethod(Method.POST);
//            request.setEndpoint("mail/send");
//            request.setBody(mail.build());
//
//            // Send the email using SendGrid API
//            Response response = sendGrid.api(request);
//            return "Email sent successfully";  // Return success message
//        } catch (IOException ex) {
//            throw new IOException("Error sending email: " + ex.getMessage(), ex);  // Handle errors
//        }
//    }


    public String sendEmail(String to, String subject, String body) throws IOException {
        // Sender email
        Email from = new Email("");  // Replace with your sender email
        // Recipient email
        Email toEmail = new Email(to);
        // Email content
        Content content = new Content("text/plain", body);
        // Construct the email
        Mail mail = new Mail(from, subject, toEmail, content);

        // Prepare the request
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            // Send email using SendGrid API
            Response response = sendGrid.api(request);

            // Log the response for debugging purposes
            System.out.println("SendGrid Response Code: " + response.getStatusCode());
            System.out.println("SendGrid Response Body: " + response.getBody());
            System.out.println("SendGrid Response Headers: " + response.getHeaders());

            // If response code is not 2xx, return an error
            if (response.getStatusCode() != 202) {
                throw new IOException("SendGrid error: " + response.getBody());
            }

            return "Email sent successfully";  // Success response

        } catch (IOException ex) {
            throw new IOException("Error sending email: " + ex.getMessage(), ex);  // Handle errors
        }
    }

}
