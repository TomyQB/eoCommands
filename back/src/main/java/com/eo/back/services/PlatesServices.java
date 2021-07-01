package com.eo.back.services;

import java.util.List;

import com.eo.back.models.Plate;
import com.eo.back.repositories.PlatesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlatesServices {

    @Autowired
    private PlatesRepository repository;
    
    public List<Plate> getAllPlates(long n){
        return repository.getPlatesByRestaurantId(n);
    }
}
