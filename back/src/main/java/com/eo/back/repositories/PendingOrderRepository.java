package com.eo.back.repositories;

import java.util.List;

import javax.transaction.Transactional;

import com.eo.back.models.PendingOrderPlate;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingOrderRepository extends JpaRepository<PendingOrderPlate, Long> {

    List<PendingOrderPlate> getPendingOrderByRestaurantId(long restaurantId);
    List<PendingOrderPlate> getPendingOrderByRestaurantIdAndTableNum(long restaurantId, int tableNum);

    @Transactional
    List<PendingOrderPlate> deleteAllPendingOrderByRestaurantIdAndTableNum(long restaurantId, int tableNum);
    PendingOrderPlate getPendingOrderByPlateNameAndRestaurantIdAndTableNum(String plateName, long restaurantId, int tableNum);
}
