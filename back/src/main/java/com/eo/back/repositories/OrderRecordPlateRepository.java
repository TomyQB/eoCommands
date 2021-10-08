package com.eo.back.repositories;

import java.util.List;

import javax.transaction.Transactional;

import com.eo.back.models.OrdersRecordPlate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRecordPlateRepository extends JpaRepository<OrdersRecordPlate, Long> {

    List<OrdersRecordPlate> getAllOrdersRecordPlateByRestaurantId(long restaurantId);
    
    OrdersRecordPlate getOrdersRecordPlateByPlateNameAndRestaurantId(String additionalName, long restaurantId);
    
    @Transactional
    void deleteAllOrdersRecordPlateByRestaurantId(long restaurantId);
    
}
