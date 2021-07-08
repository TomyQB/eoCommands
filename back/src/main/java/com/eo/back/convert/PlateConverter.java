package com.eo.back.convert;

import com.eo.back.dto.PlateDTO;
import com.eo.back.models.Plate;

import org.springframework.stereotype.Service;

@Service
public class PlateConverter extends AbstractConverter<Plate, PlateDTO> {

    @Override
    public Plate fromDTO(PlateDTO dto) {
        
        Plate plate = new Plate();
        plate.setId(dto.getId());
        plate.setAdditionals(dto.getAdditionals());
        plate.setAmount(dto.getAmount());
        plate.setDescription(dto.getDescription());
        plate.setName(dto.getName());
        plate.setPrice(dto.getPrice());

        return plate;
    }
    
}
