package com.eo.back.convert;

import com.eo.back.dto.PlateDTO;
import com.eo.back.models.Plate;
import com.eo.back.services.CategoryServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlateConverter extends AbstractConverter<Plate, PlateDTO> {

    @Autowired
    private CategoryServices categoryServices;

    @Override
    public Plate fromDTO(PlateDTO dto) {
        Plate plate = new Plate();

        if(dto.getId() != 0) plate.setId(dto.getId());
        plate.setDescription(dto.getDescription());
        plate.setDrink(dto.isDrink());
        plate.setName(dto.getName());
        plate.setPrice(dto.getPrice());
        plate.setAvailable(dto.isAvailable());
        plate.setCategory(categoryServices.getCategoryById(dto.getCategory()));

        return plate;
    }

    @Override
    public PlateDTO toDTO(Plate entity) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
