package com.eo.back.repositories;

import com.eo.back.models.Menu;
import com.eo.back.models.Restaurant;
import com.eo.back.models.UserRestaurant;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRestaurantRepository extends JpaRepository<Restaurant, Long>{
    
}
