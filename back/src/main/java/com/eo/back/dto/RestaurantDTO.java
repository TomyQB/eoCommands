package com.eo.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestaurantDTO {
    
    private long id;
    private int ordersAmount;
    private String image;
    private String idImage;
    private String name;
}
