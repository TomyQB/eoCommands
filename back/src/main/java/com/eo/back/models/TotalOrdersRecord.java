package com.eo.back.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@IdClass(TotalOrdersRecordIds.class)
@Table(name = "totalordersrecord")
@Data
public class TotalOrdersRecord {

    @Id
    private long restaurantId;

    @Id
    private String month;

    @Id
    private String year;

    private int amountOrders;
    
}
