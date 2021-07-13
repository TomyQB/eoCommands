package com.eo.back.services;

import javax.persistence.EntityNotFoundException;

import com.eo.back.models.PendingPayment;
import com.eo.back.repositories.PendingPaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PendingPaymentServices {
    
    @Autowired
    private PendingPaymentRepository pendingPaymentRepository;

    public PendingPayment getPendingPaymentByDateAndUserRestaurantId(String date, long userRestaurantId) {

        // try {
        //     System.out.println("dentro try");
        //     System.out.println(this.pendingPaymentRepository.getPendingPaymentByDateAndUserRestaurantId(date, userRestaurantId));
            return  this.pendingPaymentRepository.getPendingPaymentByDateAndUserRestaurantId(date, userRestaurantId);
        // } catch (EntityNotFoundException e) {
        //     System.out.println("dentro catch");
        //     return null;
        // }
    }

    public void savePendingPayment(PendingPayment pendingPayment) {
        this.pendingPaymentRepository.save(pendingPayment);
    }
}
