package com.eo.back.controllers;

import java.util.List;

import com.eo.back.models.Pedido;
import com.eo.back.models.UserRestaurant;
import com.eo.back.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/Login")
    public ResponseEntity<List<Pedido>> login(@RequestBody UserRestaurant user) {
        List<Pedido> pedidos = userService.loginUser(user.getEmail(), user.getPassword());
        return new ResponseEntity<List<Pedido>>(pedidos, HttpStatus.OK);
    }
    
}
