package com.eo.back.controllers;


import com.eo.back.dto.Restaurant.RestaurantConfigDTO;
import com.eo.back.services.RestaurantConfigService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class RestaurantConfigController {

    @Autowired
    private RestaurantConfigService restaurantConfigService;

    @GetMapping("/getConfig/{restaurantId}")
    public RestaurantConfigDTO getConfig(@PathVariable long restaurantId) {
        return restaurantConfigService.getConfig(restaurantId);
    }

    @PostMapping("/saveConfig")
    public void savePrinters(@RequestBody RestaurantConfigDTO restaurantConfigDTO) {
        restaurantConfigService.saveConfig(restaurantConfigDTO);
    }
}
