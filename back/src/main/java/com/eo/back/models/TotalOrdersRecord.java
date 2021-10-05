package com.eo.back.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@IdClass(TotalOrdersRecordIds.class)
@Table(name = "totalordersrecord")
@Setter
@Getter
public class TotalOrdersRecord {

    @Id
    private long restaurantId;

    @Id
    private String date;

    private int amountOrders;
    
}
