package com.eo.back.services;

import java.util.List;

import com.eo.back.models.UserRestaurant;
import com.eo.back.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository repository;

    public UserRestaurant loginUser(String email, String password) {

        List<UserRestaurant> user = repository.getUserRestaurantByEmailAndPassword(email, password);

        return user.get(0);
    }

}
