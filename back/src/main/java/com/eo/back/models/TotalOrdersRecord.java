package com.eo.back.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @ManyToOne
    @JoinColumn(name = "restaurant")
    @JsonIgnore
    private Restaurant restaurant;
    
}
