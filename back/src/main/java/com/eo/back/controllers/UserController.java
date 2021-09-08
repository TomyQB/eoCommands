package com.eo.back.controllers;

import java.text.ParseException;

import com.eo.back.models.Restaurant;
import com.eo.back.models.UserRestaurant;
import com.eo.back.services.UserService;
import com.stripe.exception.StripeException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Restaurant> login(@RequestBody UserRestaurant user) throws StripeException, ParseException {
        Restaurant restaurant = userService.loginUser(user.getEmail(), user.getPassword());
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    
}
