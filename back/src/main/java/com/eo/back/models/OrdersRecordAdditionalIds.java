package com.eo.back.models;

import java.io.Serializable;

public class OrdersRecordAdditionalIds implements Serializable {

    private long restaurantId;
    private long additionalId;

    public OrdersRecordAdditionalIds(long restaurantId, long additionalId) {
        this.restaurantId = restaurantId;
        this.additionalId = additionalId;
    }

    public OrdersRecordAdditionalIds() {
    }
}
