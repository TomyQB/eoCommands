package com.eo.back.convert.Restaurant;

import com.eo.back.convert.AbstractConverter;
import com.eo.back.dto.RestaurantDTO;
import com.eo.back.models.Restaurant;

import org.springframework.stereotype.Service;

@Service
public class RestaurantConverter extends AbstractConverter<Restaurant, RestaurantDTO> {

    @Override
    public Restaurant fromDTO(RestaurantDTO dto) {
        Restaurant restaurant = new Restaurant();

        if(dto.getId() != 0) restaurant.setId(dto.getId());
        restaurant.setName(dto.getName());
        restaurant.setImage(dto.getImage());
        restaurant.setIdImage(dto.getIdImage());

        return restaurant;
    }

    @Override
    public RestaurantDTO toDTO(Restaurant entity) {
        RestaurantDTO dto = new RestaurantDTO();

        dto.setId(entity.getId());
        // dto.setOrdersAmount(entity.getOrdersAmount());

        return dto;
    }
    
}
