package com.eo.back.services.Email;

import java.util.List;

import com.eo.back.models.PendingOrderPlate;
import com.eo.back.services.RestaurantServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class PendingOrderEmailService {
    
    @Autowired
    private JavaMailSender emailSender;

    
    @Autowired
    private RestaurantServices restaurantServices;

    public void sendEmail(List<PendingOrderPlate> pedido, String email) {
        
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("noreply@baeldung.com");
        message.setTo(restaurantServices.getRestaurantById(pedido.get(0).getRestaurantId()).getEmail()); 
        message.setSubject("Mesa: " + pedido.get(0).getTableNum() + " de las: " + pedido.get(0).getDate()); 
        message.setText(createMessage(pedido, email));

        emailSender.send(message);
    }

    public String createMessage(List<PendingOrderPlate> pedido, String email) {
        String message = "Pedido de la mesa: " + pedido.get(0).getTableNum() + " de las: " + pedido.get(0).getDate() + "\n\n";
        message += "Pedido realizado con el correo: " + email + "\n\n";

        for (PendingOrderPlate p : pedido) {
            message += p.getPlate().getName() + "  x  " + p.getAmount() + "\n";
        }

        return message;
    }
}
