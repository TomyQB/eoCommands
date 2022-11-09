package com.eo.back.convert.Restaurant;

import com.eo.back.convert.AbstractConverter;
import com.eo.back.dto.Restaurant.RestaurantConfigDTO;
import com.eo.back.models.RestaurantConfig;

import org.springframework.stereotype.Service;

@Service
public class RestaurantConfigConverter extends AbstractConverter<RestaurantConfig, RestaurantConfigDTO> {
    


    @Override
    public RestaurantConfig fromDTO(RestaurantConfigDTO dto) {
        RestaurantConfig restaurantConfig = new RestaurantConfig();

        restaurantConfig.setId(dto.getRestaurantId());
        restaurantConfig.setMailConfirmation(dto.getMailConfirmation());
        restaurantConfig.setPrintConfirmation(dto.getPrintConfirmation());

        return restaurantConfig;
    }

    @Override
    public RestaurantConfigDTO toDTO(RestaurantConfig entity) {
        RestaurantConfigDTO restaurantConfigDTO = new RestaurantConfigDTO();

        restaurantConfigDTO.setRestaurantId(entity.getId());
        restaurantConfigDTO.setMailConfirmation(entity.getMailConfirmation());
        restaurantConfigDTO.setPrintConfirmation(entity.getPrintConfirmation());

        return restaurantConfigDTO;
    }
    
}
