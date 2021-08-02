package com.eo.back.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "amount")
@Setter
@Getter
public class Amount {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int amount;
    private String description;
    private double subTotal;

    @OneToOne
    @JoinColumn(name = "idPlate")
    private Plate plate;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idOrder")
    private Pedido order;

    @Override
    public String toString() {
        return "Amount [amount=" + amount + ", description=" + description + ", id=" + id + ", subTotal=" + subTotal
                + "]";
    }
            
}
