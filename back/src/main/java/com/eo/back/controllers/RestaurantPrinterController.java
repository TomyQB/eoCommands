package com.eo.back.controllers;

import java.util.List;

import com.eo.back.dto.Restaurant.RestaurantPrinterDTO;
import com.eo.back.models.RestaurantPrinter;
import com.eo.back.services.RestaurantPrinterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class RestaurantPrinterController {

    @Autowired
    private RestaurantPrinterService restaurantPrinterService;

    @GetMapping("/getPrinters/{restaurantId}")
    public List<RestaurantPrinter> getPrinters(@PathVariable long restaurantId) {
        return restaurantPrinterService.getRestaurantPrinters(restaurantId);
    }

    @PostMapping("/savePrinters/{restaurantId}")
    public void savePrinters(@PathVariable long restaurantId,
            @RequestBody List<RestaurantPrinterDTO> restaurantPrinters) {
        restaurantPrinterService.savePrinters(restaurantId, restaurantPrinters);
    }

    @DeleteMapping("/deletePrinter/{printerId}")
    public void deletePrinter(@PathVariable long printerId) {
        restaurantPrinterService.deletePrinter(printerId);
    }

}
