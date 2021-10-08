package com.eo.back.models;

import java.io.Serializable;

public class OrdersRecordPlateIds implements Serializable {

    private long restaurantId;
    private long plateId;

    public OrdersRecordPlateIds(long restaurantId, long plateId) {
        this.restaurantId = restaurantId;
        this.plateId = plateId;
    }

    public OrdersRecordPlateIds() {
    }
    
}
