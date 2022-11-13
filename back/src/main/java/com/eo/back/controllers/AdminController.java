package com.eo.back.controllers;

import java.util.List;

import com.eo.back.models.Restaurant;
import com.eo.back.services.RestaurantServices;
import com.eo.back.services.Email.AdminEmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AdminController {

    @Autowired
    private RestaurantServices restaurantServices;

    @Autowired
    private AdminEmailService adminEmailService;

    @GetMapping("/sendEmail")
    public void senEmailAdmin() {
        List<Restaurant> restaurants = restaurantServices.getAllRestaurants();

        adminEmailService.sendEmail(restaurants);
    }
    
}
