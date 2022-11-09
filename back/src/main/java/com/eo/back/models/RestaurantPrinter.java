package com.eo.back.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "restaurant_printers")
@Data
public class RestaurantPrinter {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String type;
    private String name;
    
    @ManyToOne
    @JoinColumn(name = "restaurantId")
    @JsonIgnore
    private Restaurant restaurant;

}
