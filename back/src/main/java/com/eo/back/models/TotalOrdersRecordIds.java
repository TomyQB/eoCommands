package com.eo.back.models;

import java.io.Serializable;

public class TotalOrdersRecordIds implements Serializable{

    private long restaurantId;
    private String date;

    public TotalOrdersRecordIds(long restaurantId, String date) {
        this.restaurantId = restaurantId;
        this.date = date;
    }

    public TotalOrdersRecordIds() {
    }
    
}
