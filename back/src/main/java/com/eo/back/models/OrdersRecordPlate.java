package com.eo.back.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@IdClass(OrdersRecordPlateIds.class)
@Table(name = "ordersrecordplate")
@Data
public class OrdersRecordPlate {
    
    @Id
    private long restaurantId;
    
    @Id
    @Column(name = "plateref")
    private long plateId;

    @OneToOne
    private Plate plate;

    private double subTotal;
    private int amount;
    private String date;
    
}
