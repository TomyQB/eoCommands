package com.eo.back.services;

import java.util.List;

import com.eo.back.dto.RestaurantLoginDTO;
import com.eo.back.models.Pedido;
import com.eo.back.models.Restaurant;
import com.eo.back.repositories.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantServices {

    @Autowired
    private RestaurantRepository repository;

    public List<Restaurant> getAllRestaurants() {
        return repository.findAll();
    }

    public Restaurant getRestaurantById(long id) {
        return repository.getById(id);
    }

    public Restaurant getRestaurantByName(String name) {
        return repository.getRestaurantByName(name);
    }

    public Restaurant getRestaurantByRestaurantLogin(RestaurantLoginDTO restaurantLoginDTO) {
        return repository.getRestaurantByEmailAndPassword(restaurantLoginDTO.getEmail(), restaurantLoginDTO.getPassword());
    }
    
    public List<Pedido> getAllPedidos(long id) {
        return this.getRestaurantById(id).getOrders();
    }

    public void saveRestaurant(Restaurant restaurant) {
        repository.save(restaurant);
    }

    // public void updateOrdersAmount(long id) {
    //     Restaurant restaurant = this.getRestaurantById(id);
    //     int ordersAmount = restaurant.getOrdersAmount() + 1;
    //     restaurant.setOrdersAmount(ordersAmount);
    //     repository.save(restaurant);
    // }
}
