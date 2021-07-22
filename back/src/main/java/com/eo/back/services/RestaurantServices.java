package com.eo.back.services;

import java.util.List;

import com.eo.back.models.Pedido;
import com.eo.back.models.Restaurant;
import com.eo.back.repositories.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantServices {

    @Autowired
    private RestaurantRepository repository;

    public Restaurant getRestaurantByName(String name) {
        return repository.getRestaurantByName(name);
    }
    
    public List<Pedido> getAllPedidos(long id) {
        return repository.getRestaurantByUserRestaurantId(id).getOrders();
    }
}
