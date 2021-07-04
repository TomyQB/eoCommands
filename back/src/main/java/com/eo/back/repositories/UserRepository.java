package com.eo.back.repositories;

import java.util.List;

import com.eo.back.models.UserRestaurant;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserRestaurant, Long> {
    List<UserRestaurant>getUserRestaurantByEmailAndPassword(String email, String password);
}
