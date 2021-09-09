package com.eo.back.dto;

import com.eo.back.models.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlateDTO {

    private String description;
    private boolean drink;
    private String name;
    private double price;
    private long category;
    
}
