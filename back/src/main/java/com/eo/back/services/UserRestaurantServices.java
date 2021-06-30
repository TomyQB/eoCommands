package com.eo.back.services;

import com.eo.back.models.UserRestaurant;
import com.eo.back.repositories.UserRestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRestaurantServices {

    @Autowired
    private UserRestaurantRepository repository;
    
    public void saveUser(UserRestaurant user){
        repository.save(user);
    }
}
