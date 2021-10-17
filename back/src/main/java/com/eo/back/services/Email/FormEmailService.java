package com.eo.back.services.Email;

import com.eo.back.dto.FormMessageDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class FormEmailService extends AbstractEmailService<FormMessageDTO> {
    
    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void sendEmail(FormMessageDTO dto) {
        
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("noreply@baeldung.com");
        message.setTo("eorestaurantes@gmail.com"); 
        message.setSubject("Nuevo restaurante interesado en eo!");
        message.setText(createMessage(dto));

        emailSender.send(message);
        
    }

    @Override
    public String createMessage(FormMessageDTO dto) {
        return "Nombre: " + dto.getName() +
                "\nEmail: " + dto.getEmail() +
                "\nTeléfono: " + dto.getPhone() +
                "\nComentarios: " + dto.getComents();
    }
    
}
