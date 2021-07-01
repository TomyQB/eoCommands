package com.eo.back.controllers;

import java.util.List;

import com.eo.back.models.Plate;
import com.eo.back.services.PlatesServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PlatesController {

    @Autowired
    private PlatesServices services;
    
    @GetMapping("/test/{id}")
    public ResponseEntity<List<Plate>> getPlatesByRestaurantId(@PathVariable long id){
        List<Plate> rest = services.getAllPlates(id);
        return new ResponseEntity<List<Plate>>(rest, HttpStatus.OK);
    }
}
