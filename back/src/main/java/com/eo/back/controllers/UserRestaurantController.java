package com.eo.back.controllers;

import com.eo.back.models.UserRestaurant;
import com.eo.back.services.UserRestaurantServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserRestaurantController {

    @Autowired
    private UserRestaurantServices services;
    
    @PostMapping("/test")
    public void test(@RequestBody UserRestaurant user){
        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        System.out.println(user);
        services.saveUser(user);
    }
}
