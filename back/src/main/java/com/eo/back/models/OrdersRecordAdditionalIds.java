package com.eo.back.models;

import java.io.Serializable;

public class OrdersRecordAdditionalIds implements Serializable {

    private long restaurantId;
    private Additional additional;

    public OrdersRecordAdditionalIds(long restaurantId, Additional additional) {
        this.restaurantId = restaurantId;
        this.additional = additional;
    }

    public OrdersRecordAdditionalIds() {
    }
}
