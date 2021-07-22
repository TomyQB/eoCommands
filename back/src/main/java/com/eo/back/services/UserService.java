package com.eo.back.services;

import com.eo.back.models.UserRestaurant;
import com.eo.back.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public UserRestaurant loginUser(String email, String password) {

        UserRestaurant user = userRepository.getUserRestaurantByEmailAndPassword(email, password);

        return user;
    }

}
