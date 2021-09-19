package com.eo.back.controllers;

import com.eo.back.convert.AdditionalConverter;
import com.eo.back.dto.AdditionalDTO;
import com.eo.back.models.Additional;
import com.eo.back.services.AdditionalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AdditionalController {

    @Autowired
    private AdditionalService additionalService;

    @Autowired
    private AdditionalConverter additionalConverter;

    @PostMapping("/createAdditional")
    public void createAdditional(@RequestBody AdditionalDTO additionalDTO) {
        Additional additional = additionalConverter.fromDTO(additionalDTO);
        additionalService.saveAdditional(additional);
    }

    @PostMapping("/deleteAdditional")
    public void deleteAdditional(@RequestBody long id) {
        additionalService.deleteAdditional(id);
    }

    
}
