package com.eo.back.repositories;

import java.util.List;

import javax.transaction.Transactional;

import com.eo.back.models.OrdersRecordAdditional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRecordAdditionalRepository extends JpaRepository<OrdersRecordAdditional, Long> {

    List<OrdersRecordAdditional> getAllOrdersRecordAdditionalByRestaurantId(long restaurantId);

    OrdersRecordAdditional getOrdersRecordAdditionalByAdditionalNameAndRestaurantId(String additionalName, long restaurantId);

    @Transactional
    void deleteAllOrdersRecordAdditionalByRestaurantId(long restaurantId);
    
}
