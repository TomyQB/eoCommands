package com.eo.back.services;

import java.util.List;

import com.eo.back.models.Menu;
import com.eo.back.models.Restaurant;
import com.eo.back.models.UserRestaurant;
import com.eo.back.repositories.UserRestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuServices {

    @Autowired
    private UserRestaurantRepository repository;
    
    public Restaurant getAllMenus(long n){
        return repository.getById(n);
    }
}
