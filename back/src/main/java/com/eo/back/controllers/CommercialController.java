package com.eo.back.controllers;

import com.eo.back.dto.LoginDTO;
import com.eo.back.models.Commercial;
import com.eo.back.services.CommercialService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class CommercialController {

    @Autowired
    private CommercialService commercialService;

    @PostMapping("/loginCommercial")
    public Commercial loginCommercial(@RequestBody LoginDTO loginDTO) {
        System.out.println(loginDTO.toString());
        return commercialService.loginCommercial(loginDTO);
    }
    
}
