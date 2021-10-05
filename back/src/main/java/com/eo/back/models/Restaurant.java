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

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "restaurant")
@Data
public class Restaurant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String image;
    private String idImage;
    private String userName;
    private String email;
    private String phone;
    private String password;
    private String iban;

    @OneToMany(mappedBy = "restaurant")
    @JsonIgnore
    private List<Category> categories;

    @OneToMany(mappedBy = "restaurant")
    private List<Pedido> orders;
        
}
