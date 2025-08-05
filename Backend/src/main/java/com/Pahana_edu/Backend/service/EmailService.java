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
    private SendGrid sendGrid;

    public String sendEmail(String to, String subject, String body) throws IOException {
        System.out.println(to);
        // Your sender email
        Email toEmail = new Email(to); // Recipient's email
        Content content = new Content("text/plain", body); // Email body
        Mail mail = new Mail(from, subject, toEmail, content);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            // Send the email
            Response response = sendGrid.api(request);
            return "Email sending success"; // Return the response body (can be logged or used for further handling)
        } catch (IOException ex) {
            throw new IOException("Error sending email: " + ex.getMessage(), ex); // More detailed error handling
        }
    }
}
