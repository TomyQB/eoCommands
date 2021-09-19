package com.eo.back.services.Email;

import com.eo.back.dto.FormMessageDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.Extra;
import com.eo.back.models.Pedido;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class PedidoEmailService extends AbstractEmailService<Pedido> {
    
    @Autowired
    private JavaMailSender emailSender;

    public void sendEmail(Pedido pedido) {
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("noreply@baeldung.com");
        message.setTo(pedido.getEmail()); 
        message.setSubject(pedido.getRestaurant().getName());
        message.setText(createMessage(pedido));

        emailSender.send(message);
    }

    public String createMessage(Pedido pedido) {
        String message = "¡Hola!\n\nAquí puedes ver el resumen de tu pedido en " + pedido.getRestaurant().getName() + "\n\n";

        message += "______________________________\n\n";

        for (Amount a : pedido.getAmounts()) {
            message += a.getAmount() + " " + a.getPlate().getName() + " " + a.getPlate().getPrice() + "€ " + " = " + a.getSubTotal() + "€\n";
            for(Extra e : a.getExtras()) {
                message += "\t" + e.getName() + " " + e.getPrice() + "€\n";
            }
        }
        
        message += "\nTotal = " + pedido.getTotal() + "€\n\n";
        message += "______________________________\n\n";
        message += "¡Muchas gracias!\n\n";
        message += "Buen provecho ;)";
        return message;
    }

}
