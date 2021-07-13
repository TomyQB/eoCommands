package com.eo.back.repositories;

import com.eo.back.models.PendingPayment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PendingPaymentRepository extends JpaRepository<PendingPayment, String> {

    PendingPayment getPendingPaymentByDateAndUserRestaurantId(String date, long id);
    
}
