package com.eo.back.repositories;

import com.eo.back.models.UserRestaurant;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserRestaurant, Long> {
    UserRestaurant getUserRestaurantByEmailAndPassword(String email, String password);
}
