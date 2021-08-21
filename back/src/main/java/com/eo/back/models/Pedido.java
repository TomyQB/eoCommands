package com.eo.back.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pedido")
@Setter
@Getter
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String date;
    private double total;
    private int tableNum;
    private String email;
    private String phoneNumber;
    private String estado;
    private int hechos;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idRestaurante")
    private Restaurant restaurant;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Amount> amounts;

    @Override
    public String toString() {
        return "Pedido [amounts=" + amounts + ", date=" + date + ", email=" + email + ", id=" + id + ", restaurant="
                + restaurant + ", tableNum=" + tableNum + ", total=" + total + "]";
    } 
        
}
