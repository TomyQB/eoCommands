package com.eo.back.controllers;

import java.util.List;

import com.eo.back.models.Menu;
import com.eo.back.models.Restaurant;
import com.eo.back.models.UserRestaurant;
import com.eo.back.services.MenuServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MenuController {

    @Autowired
    private MenuServices services;
    
    @GetMapping("/test")
    public ResponseEntity<Restaurant> test(){
        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        Restaurant rest = services.getAllMenus(1); 
        return new ResponseEntity<Restaurant>(rest, HttpStatus.OK);
    }
}
