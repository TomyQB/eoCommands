package com.eo.back.models;

import java.io.Serializable;

public class TotalOrdersRecordIds implements Serializable{

    private long restaurantId;
    private String month;
    private String year;

    public TotalOrdersRecordIds(long restaurantId, String month, String year) {
        this.restaurantId = restaurantId;
        this.month = month;
        this.year = year;
    }

    public TotalOrdersRecordIds() {
    }
    
}
