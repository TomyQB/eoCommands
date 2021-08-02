package com.eo.back.repositories;

import java.util.List;

import javax.transaction.Transactional;

import com.eo.back.models.PendingOrder;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingOrderRepository extends JpaRepository<PendingOrder, Long> {

    List<PendingOrder> getPendingOrderByRestaurantId(long restaurantId);
    List<PendingOrder> getPendingOrderByRestaurantIdAndTableNum(long restaurantId, int tableNum);

    @Transactional
    void deleteAllPendingOrderByRestaurantIdAndTableNum(long restaurantId, int tableNum);
    PendingOrder getPendingOrderByPlateNameAndRestaurantIdAndTableNum(String plateName, long restaurantId, int tableNum);
}
