package com.eo.back.convert;

import com.eo.back.dto.RestaurantDTO;
import com.eo.back.models.Restaurant;

public class RestauratnConverter extends AbstractConverter<Restaurant, RestaurantDTO> {

    @Override
    public Restaurant fromDTO(RestaurantDTO dto) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public RestaurantDTO toDTO(Restaurant entity) {
        RestaurantDTO dto = new RestaurantDTO();

        dto.setId(entity.getId());
        dto.setOrdersAmount(entity.getOrdersAmount());

        return dto;
    }
    
}
