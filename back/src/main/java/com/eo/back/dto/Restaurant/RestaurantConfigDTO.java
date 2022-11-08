package com.eo.back.dto.Restaurant;

import lombok.Data;

@Data
public class RestaurantConfigDTO {

    private long restaurantId;
    private int printConfirmation;
    private int mailConfirmation;
    
}
