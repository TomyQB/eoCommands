package com.eo.back.repositories;

import java.util.List;

import javax.transaction.Transactional;

import com.eo.back.models.PendingOrderPlate;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingOrderPlateRepository extends JpaRepository<PendingOrderPlate, Long> {

    List<PendingOrderPlate> getPendingOrderPlateByRestaurantId(long restaurantId);
    List<PendingOrderPlate> getPendingOrderPlateByRestaurantIdAndTableNum(long restaurantId, int tableNum);

    @Transactional
    void deleteAllPendingOrderPlateByRestaurantIdAndTableNum(long restaurantId, int tableNum);
    PendingOrderPlate getPendingOrderPlateByPlateNameAndRestaurantIdAndTableNum(String plateName, long restaurantId, int tableNum);
}
