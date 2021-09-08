package com.eo.back.services.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class CodeEmailService {
    
    @Autowired
    private JavaMailSender emailSender;

    public String sendEmail(String email) {
        String code = generateVerifyCode();

        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("noreply@baeldung.com");
        message.setTo(email); 
        message.setSubject("Codigo de verificación");
        message.setText(createMessage(code));

        emailSender.send(message);

        return code;
    }

    public String createMessage(String code) {
        return "El codigo de verificación para realizar el pedido es: " + code;
    }

    
    private String generateVerifyCode() {
        return String.valueOf((int) Math.floor(Math.random() * (9999 - 1000 + 1) + 1000));
    }
    
}
