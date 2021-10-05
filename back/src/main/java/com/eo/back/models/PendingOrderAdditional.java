package com.eo.back.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@IdClass(PendingOrderAdditionalIds.class)
@Table(name = "pendingorderadditional")
@Setter
@Getter
public class PendingOrderAdditional {
    
    @Id
    private long restaurantId;

    @Id
    private int tableNum;

    @Id
    @Column(name = "additionalref")
    private long additionalId;

    @OneToOne
    private Additional additional;

    private double subTotal;
    private int amount;
    private String date;
    
}
