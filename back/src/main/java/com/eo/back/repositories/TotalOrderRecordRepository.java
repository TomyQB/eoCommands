package com.eo.back.repositories;

import java.util.List;

import com.eo.back.models.TotalOrdersRecord;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TotalOrderRecordRepository extends JpaRepository<TotalOrdersRecord, Long> {

    List<TotalOrdersRecord> getTotalOrdersRecordByRestaurantId(long retaurantId);

    TotalOrdersRecord getTotalOrdersRecordByMonthAndYearAndRestaurantId(String month, String year, long restaurantId);
}
