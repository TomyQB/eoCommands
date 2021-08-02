package com.eo.back.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@IdClass(PendingOrderIds.class)
@Table(name = "pendingorder")
@Setter
@Getter
public class PendingOrder {
    
    @Id
    private long restaurantId;

    @Id
    private int tableNum;

    @Id
    private String plateName;

    private int amount;
}
