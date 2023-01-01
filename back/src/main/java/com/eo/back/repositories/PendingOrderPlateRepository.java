package com.eo.back.repositories;

import java.util.List;

import javax.transaction.Transactional;

import com.eo.back.models.PendingOrderPlate;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingOrderPlateRepository extends JpaRepository<PendingOrderPlate, Long> {

    List<PendingOrderPlate> getPendingOrderPlateByRestaurantId(long restaurantId);

    List<PendingOrderPlate> getPendingOrderPlateByRestaurantIdAndTableNum(long restaurantId, int tableNum);

    PendingOrderPlate getPendingOrderPlateByRestaurantIdAndPlateIdAndTableNum(final long restaurantId,
            final long plateId, final int tableNum);

    @Transactional
    List<PendingOrderPlate> deleteAllPendingOrderPlateByRestaurantIdAndTableNum(long restaurantId, int tableNum);

    PendingOrderPlate getPendingOrderPlateByPlateNameAndRestaurantIdAndTableNum(String plateName, long restaurantId,
            int tableNum);
}
