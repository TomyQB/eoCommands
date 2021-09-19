package com.eo.back.convert;

import com.eo.back.dto.AdditionalDTO;
import com.eo.back.models.Additional;
import com.eo.back.services.PlateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdditionalConverter extends AbstractConverter<Additional, AdditionalDTO> {

    @Autowired
    private PlateService plateService;

    @Override
    public Additional fromDTO(AdditionalDTO dto) {
        Additional additional = new Additional();

        if(dto.getId() != 0) additional.setId(dto.getId());
        additional.setName(dto.getName());
        additional.setPrice(dto.getPrice());
        additional.setPlate(plateService.getPlateById(dto.getPlateId()));

        return additional;
    }

    @Override
    public AdditionalDTO toDTO(Additional entity) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
