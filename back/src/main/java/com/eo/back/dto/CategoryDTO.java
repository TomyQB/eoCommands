package com.eo.back.dto;

import com.eo.back.models.Restaurant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDTO {

    private String name;
    private String type;
    private long restaurant;
    
}
