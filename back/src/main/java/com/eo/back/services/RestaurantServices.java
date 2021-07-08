package com.eo.back.services;

import com.eo.back.models.Restaurant;
import com.eo.back.repositories.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantServices {

    @Autowired
    private RestaurantRepository repository;
    
    public Restaurant getRestaurantById(long id) {
        return repository.getById(id);
    }

    public Restaurant getRestaurantByName(String name) {
        return repository.getRestaurantByName(name);
    }
}
