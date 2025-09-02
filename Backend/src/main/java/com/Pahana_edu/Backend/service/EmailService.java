

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

    public String sendEmail(String to, String subject, String body) throws IOException {
        // Sender email
        Email from = new Email("sithumchanukasandaruwan2002@gmail.com");  // Replace with your sender email
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
