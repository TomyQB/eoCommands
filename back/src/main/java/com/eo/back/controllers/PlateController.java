package com.eo.back.controllers;

import com.eo.back.convert.PlateConverter;
import com.eo.back.dto.PlateDTO;
import com.eo.back.models.Plate;
import com.eo.back.services.PlateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin
public class PlateController {
    
    @Autowired
    private PlateService plateService;
    
    @Autowired
    private PlateConverter plateConverter;

    @PostMapping("/createPlate")
    public void createPlate(@RequestBody PlateDTO plateDTO) {
        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        plateDTO.setCategory(7);
        plateDTO.setDescription("Lo estoy probando jeje va muy bien");
        plateDTO.setDrink(true);
        plateDTO.setName("Cervecita de la rica papi");
        plateDTO.setPrice(1000);
        Plate plate = plateConverter.fromDTO(plateDTO);
        plateService.savePlate(plate);
    }

    @PostMapping("/deletePlate")
    public void deleteCategory(@RequestBody long id) {
        plateService.deletePlate(id);
    }
}
