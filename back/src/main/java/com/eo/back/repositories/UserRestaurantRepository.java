package com.eo.back.repositories;

import com.eo.back.models.UserRestaurant;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRestaurantRepository extends JpaRepository<UserRestaurant, Long>{
    
}
