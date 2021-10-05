package com.eo.back.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@IdClass(OrdersRecordPlateIds.class)
@Table(name = "ordersrecordplate")
@Setter
@Getter
public class OrdersRecordPlate {
    
    @Id
    private long restaurantId;

    @Id
    @OneToOne
    private Plate plate;

    private double subTotal;
    private int amount;
    private String date;
    
}
