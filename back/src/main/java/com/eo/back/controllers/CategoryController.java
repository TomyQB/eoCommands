package com.eo.back.controllers;

import java.util.List;

import com.eo.back.models.Category;
import com.eo.back.services.CategoryServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    @Autowired
    private CategoryServices services;

    @GetMapping
    public ResponseEntity<List<String>> getCategories(){
        List<String> categoriesList = services.getAllCategories();
        return new ResponseEntity<List<String>>(categoriesList, HttpStatus.OK);
    }
    
}
