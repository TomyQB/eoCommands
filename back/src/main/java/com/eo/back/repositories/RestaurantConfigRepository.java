package com.eo.back.repositories;

import com.eo.back.models.RestaurantConfig;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantConfigRepository extends JpaRepository<RestaurantConfig, Long> {

}
