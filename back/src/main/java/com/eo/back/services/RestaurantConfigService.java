package com.eo.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eo.back.convert.Restaurant.RestaurantConfigConverter;
import com.eo.back.dto.Restaurant.RestaurantConfigDTO;
import com.eo.back.models.RestaurantConfig;
import com.eo.back.repositories.RestaurantConfigRepository;

@Service
public class RestaurantConfigService {

    @Autowired
    private RestaurantConfigRepository restaurantConfigRepository;
    
    @Autowired
    private RestaurantConfigConverter restaurantConfigConverter;

    public RestaurantConfigDTO getConfig(final long restaurantId) {
        return restaurantConfigConverter.toDTO(restaurantConfigRepository.getById(restaurantId));
    }

    public void saveConfig(final RestaurantConfigDTO restaurantConfigDTO) {
        RestaurantConfig restaurantConfig = restaurantConfigConverter.fromDTO(restaurantConfigDTO);
        restaurantConfigRepository.save(restaurantConfig);
    }
}
