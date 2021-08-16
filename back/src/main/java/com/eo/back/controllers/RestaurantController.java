package com.eo.back.controllers;

import com.eo.back.models.Restaurant;
import com.eo.back.services.RestaurantServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class RestaurantController {
    
    @Autowired
    private RestaurantServices restaurantServices;

    @PostMapping("/restaurant")
    public ResponseEntity<Restaurant> getRestaurantImage(@RequestBody String restaurantName){
        Restaurant restaurant = restaurantServices.getRestaurantByName(restaurantName);
        restaurant.setOrders(null);
        return new ResponseEntity<Restaurant>(restaurant, HttpStatus.OK);
    }
    
}
