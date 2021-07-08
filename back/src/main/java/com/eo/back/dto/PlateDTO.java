package com.eo.back.dto;

import java.util.List;

import com.eo.back.models.Additional;
import com.eo.back.models.Amount;
import com.eo.back.models.Plate;

public class PlateDTO {

    private Long id;
    private String name;
    private String description;
    private double price;
    private List<Additional> additionals;
    private Amount amount;
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public List<Additional> getAdditionals() {
        return additionals;
    }
    public void setAdditionals(List<Additional> additionals) {
        this.additionals = additionals;
    }
    public Amount getAmount() {
        return amount;
    }
    public void setAmount(Amount amount) {
        this.amount = amount;
    }
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    @Override
    public String toString() {
        return "PlateDTO [additionals=" + additionals + ", amount=" + amount + ", description=" + description
                + ", name=" + name + ", price=" + price + "]";
    }

    
                     
}
