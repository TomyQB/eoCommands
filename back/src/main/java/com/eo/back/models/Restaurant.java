package com.eo.back.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "restaurant")
@Setter
@Getter
public class Restaurant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String image;
    private String idImage;
    private int ordersAmount;

    @OneToOne
    @JoinColumn(name = "idUserrestaurant")
    private UserRestaurant userRestaurant;

    @OneToMany(mappedBy = "restaurant")
    @JsonIgnore
    private List<Category> categories;

    @OneToMany(mappedBy = "restaurant")
    private List<Pedido> orders;

    @Override
    public String toString() {
        return "Restaurant [id=" + id + "]";
    }
        
}
