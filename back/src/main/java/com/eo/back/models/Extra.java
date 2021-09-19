package com.eo.back.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "extra")
@Setter
@Getter
public class Extra {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private double price;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idAmount")
    private Amount amount;

    @Override
    public String toString() {
        return "Extra [id=" + id + ", name=" + name + ", price=" + price + "]";
    }
  
}
