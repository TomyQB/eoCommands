package com.eo.back.repositories;

import com.eo.back.models.Restaurant;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Restaurant getRestaurantByName(String name);

    Restaurant getRestaurantByEmailAndPassword(String email, String password);
    
}
