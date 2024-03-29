package com.eo.back.controllers;

import java.io.IOException;

import com.eo.back.dto.FormMessageDTO;
import com.eo.back.dto.RestaurantDTO;
import com.eo.back.dto.LoginDTO;
import com.eo.back.models.Restaurant;
import com.eo.back.services.CloudinaryService;
import com.eo.back.services.RestaurantServices;
import com.eo.back.services.Email.FormEmailService;

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
    
    @Autowired
    private CloudinaryService cloudinaryService;
    
    @Autowired
    private FormEmailService formEmailService;

    @PostMapping("/restaurant")
    public ResponseEntity<Restaurant> getRestaurantImage(@RequestBody String restaurantName){
        Restaurant restaurant = restaurantServices.getRestaurantByName(restaurantName);
        restaurant.setOrders(null);
        return new ResponseEntity<Restaurant>(restaurant, HttpStatus.OK);
    }

    @PostMapping("/photoRestaurant")
    public void uploadPhotoRestaurant(@RequestBody RestaurantDTO restaurantDTO) throws IOException {
        Restaurant restaurant = restaurantServices.getRestaurantById(restaurantDTO.getId());
        if(restaurant.getIdImage() != null) cloudinaryService.delete(restaurant.getIdImage());
        restaurant.setImage(restaurantDTO.getImage());
        restaurant.setIdImage(restaurantDTO.getIdImage());
        restaurantServices.saveRestaurant(restaurant);
    }

    @PostMapping("/form")
    public void getFormMessage(@RequestBody FormMessageDTO dto) {
        formEmailService.sendEmail(dto);
    }

    @PostMapping("/login")
    public Restaurant login(@RequestBody LoginDTO loginDTO) {
        return restaurantServices.getRestaurantByRestaurantLogin(loginDTO);
    }
    
}
