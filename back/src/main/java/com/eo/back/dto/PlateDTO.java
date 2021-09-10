package com.eo.back.dto;

import com.eo.back.models.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlateDTO {

    private long id;
    private String description;
    private boolean drink;
    private String name;
    private double price;
    private long category;
    private boolean available;

    @Override
    public String toString() {
        return "PlateDTO [category=" + category + ", description=" + description + ", drink=" + drink + ", id=" + id
                + ", available=" + available + ", name=" + name + ", price=" + price + "]";
    }
    
}
