package com.eo.back.services.Email;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.eo.back.models.Month;
import com.eo.back.models.Restaurant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class AdminEmailService extends AbstractEmailService<List<Restaurant>> {
    
    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void sendEmail(List<Restaurant> restaurants) {
        getMonth();
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("noreply@baeldung.com");
        for (Restaurant restaurant : restaurants) {
            message.setTo(restaurant.getEmail());
            message.setSubject("Factura de eorestaurantes en el mes de " + getMonth());
            // message.setText(createMessageCount(restaurant));
            emailSender.send(message);
        } 
        
    }

    // private String createMessageCount(Restaurant restaurant) {
    //     String message = "En el mes de " + getMonth() + " ha realizado " + restaurant.getOrdersAmount() + " pedidos, se cobra 0.10€ el pedido: \n\n";
    //     message += restaurant.getOrdersAmount() + " x 0.10 = " + Math.floor(restaurant.getOrdersAmount()*0.10 * 100) / 100  + "€\n\n";
    //     message += "En un plazo máximo de 5 dias le llegara el cargo a su banco a la cuenta: " + restaurant.getIban();
    //     return message;
    // } 

    private String getMonth() {
        Date date= new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int month = cal.get(Calendar.MONTH);
        return Month.intToMonth(month);
    }

    @Override
    public String createMessage(List<Restaurant> e) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
