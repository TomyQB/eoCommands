package com.eo.back.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@IdClass(OrdersRecordAdditionalIds.class)
@Table(name = "ordersrecordadditional")
@Setter
@Getter
public class OrdersRecordAdditional {
    
    @Id
    private long restaurantId;

    @Id
    @OneToOne
    private Additional additional;

    private double subTotal;
    private int amount;
    private String date;
    
}
