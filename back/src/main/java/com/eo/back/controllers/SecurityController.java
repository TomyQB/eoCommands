package com.eo.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.eo.back.services.SecurityService;

@RestController
@CrossOrigin
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    @GetMapping("/checkGeolocation/{restaurantId}/{latitude}/{longitude}")
    public boolean checkGeolocation(@PathVariable long restaurantId, @PathVariable double latitude,
            @PathVariable double longitude) {
        return securityService.checkGeolocation(restaurantId, latitude, longitude);
    }

}
