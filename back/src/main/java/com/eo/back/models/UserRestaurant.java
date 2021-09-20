package com.eo.back.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "userRestaurant")
@Setter
@Getter
public class UserRestaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String email;
    private String phone;
    private String password;
    private String iban;

    @OneToOne(mappedBy = "userRestaurant")
    @JsonIgnore
    private Restaurant restaurant;

    // @Override
    // public String toString() {
    //     return "UserRestaurant [id=" + id + ", name=" + name + ", email=" + email + ", IBAN=" + IBAN + "]";
    // }

}
