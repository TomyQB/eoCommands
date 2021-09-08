package com.eo.back.services;

import com.eo.back.models.Restaurant;
import com.eo.back.models.UserRestaurant;
import com.eo.back.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RestaurantServices restaurantServices;

    public Restaurant loginUser(String email, String password) {

        UserRestaurant user = userRepository.getUserRestaurantByEmailAndPassword(email, password);

        Restaurant restaurant = restaurantServices.getRestaurantByUserId(user.getId());

        return restaurant;
    }

}
