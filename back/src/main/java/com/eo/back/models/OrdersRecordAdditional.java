package com.eo.back.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@IdClass(OrdersRecordAdditionalIds.class)
@Table(name = "ordersrecordadditional")
@Data
public class OrdersRecordAdditional {
    
    @Id
    private long restaurantId;
    
    @Id
    @Column(name = "additionalref")
    private long additionalId;

    @OneToOne
    private Additional additional;

    private double subTotal;
    private int amount;
    private String date;
    
}
