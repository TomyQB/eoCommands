package com.eo.back.models;

import java.io.Serializable;

public class OrdersRecordPlateIds implements Serializable {

    private long restaurantId;
    private Plate plate;

    public OrdersRecordPlateIds(long restaurantId, Plate plate) {
        this.restaurantId = restaurantId;
        this.plate = plate;
    }

    public OrdersRecordPlateIds() {
    }
    
}
