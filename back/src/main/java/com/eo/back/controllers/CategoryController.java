package com.eo.back.controllers;

import java.util.List;

import com.eo.back.models.Category;
import com.eo.back.services.CategoryServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    @Autowired
    private CategoryServices services;

    @GetMapping("/menu/{restaurantName}")
    public ResponseEntity<List<Category>> getCategories(@PathVariable String restaurantName){
        List<Category> categoriesList = services.getAllCategories(restaurantName);
        for (Category category : categoriesList) {
            System.out.println(category.getPlates());
        }
        return new ResponseEntity<List<Category>>(categoriesList, HttpStatus.OK);
    }
    
}
