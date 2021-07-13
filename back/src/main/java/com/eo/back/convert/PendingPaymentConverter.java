package com.eo.back.convert;

import com.eo.back.dto.PendingPaymentDTO;
import com.eo.back.models.PendingPayment;
import com.eo.back.models.UserRestaurant;
import com.eo.back.services.PendingPaymentServices;
import com.eo.back.services.RestaurantServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PendingPaymentConverter extends AbstractConverter<PendingPayment, PendingPaymentDTO>{

    @Autowired
    private RestaurantServices restaurantServices;
    
    @Autowired
    private PendingPaymentServices pendingPaymentServices;

    @Override
    public PendingPayment fromDTO(PendingPaymentDTO dto) {

        String date = "20/20/2020";

        PendingPayment pendingPayment = new PendingPayment();
        UserRestaurant userRestaurant = restaurantServices.getRestaurantByName(dto.getNameUserRestaurant()).getUserRestaurant();
        
        long amount = calculateComision(dto.getAmount());

        if(pendingPaymentServices.getPendingPaymentByDateAndUserRestaurantId(date, userRestaurant.getId()) == null) {
            System.out.println("null");
            pendingPayment.setAmount(amount);
            pendingPayment.setDate(date);
            System.out.println("CCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
            pendingPayment.setSecondPK(userRestaurant.getId());
            System.out.println("DDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
            pendingPayment.setUserRestaurant(userRestaurant);
        } else {
            System.out.println("not null");
            pendingPayment = pendingPaymentServices.getPendingPaymentByDateAndUserRestaurantId(date, userRestaurant.getId());
            pendingPayment.setAmount(pendingPayment.getAmount() + amount);
        }
        
        

        return pendingPayment;
    }

    private long calculateComision(long amount) {

        return (long) ((amount * 0.986 - 0.25) * 100);
    }
    
}
