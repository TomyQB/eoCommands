package com.eo.back.services;

import com.eo.back.models.Plate;
import com.eo.back.repositories.PlateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlateService {
    
    @Autowired
    private PlateRepository plateRepository;

    public void savePlate(Plate plate) {
        plateRepository.save(plate);
    }

    public void deletePlate(long id) {
        plateRepository.deleteById(id);
    }
}
