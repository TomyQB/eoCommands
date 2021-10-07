package com.eo.back.repositories;

import java.util.List;

import javax.transaction.Transactional;

import com.eo.back.models.PendingOrderAdditional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingOrderAdditionalRepository extends JpaRepository<PendingOrderAdditional, Long> {

    List<PendingOrderAdditional> getPendingOrderAdditionalByRestaurantId(long restaurantId);
    List<PendingOrderAdditional> getPendingOrderAdditionalByRestaurantIdAndTableNum(long restaurantId, int tableNum);

    @Transactional
    void deleteAllPendingOrderAdditionalByRestaurantIdAndTableNum(long restaurantId, int tableNum);
    PendingOrderAdditional getPendingOrderAdditionalByAdditionalNameAndRestaurantIdAndTableNum(String extraName, long restaurantId, int tableNum);
}
