package com.eo.back.repositories;

import com.eo.back.models.RestaurantPrinter;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantPrinterRepository extends JpaRepository<RestaurantPrinter, Long> {

    List<RestaurantPrinter> findByRestaurantId(final long restaurantId);
}
