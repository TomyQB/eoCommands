package com.eo.back.controllers;

import java.util.List;

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
        
    @PostMapping("/getPlate")
    public Plate getPlateById(@RequestBody long id) {
        return plateService.getPlateById(id);
    }

    @PostMapping("/getPlates")
    public List<Plate> getPlates(@RequestBody long categoryId) {
        return plateService.getPlateByCategoryId(categoryId);
    }

    @PostMapping("/createPlate")
    public void createPlate(@RequestBody PlateDTO plateDTO) {
        Plate plate = plateConverter.fromDTO(plateDTO);
        plateService.savePlate(plate);
    }

    @PostMapping("/deletePlate")
    public void deletePlate(@RequestBody long id) {
        plateService.deletePlate(id);
    }

    @PostMapping("/updatePlate")
    public void updatePlate(@RequestBody PlateDTO plateDTO) {
        Plate plate = plateService.getPlateById(plateDTO.getId());
        plate.setAvailable(plateDTO.isAvailable());
        plateService.savePlate(plate);
    }
}
