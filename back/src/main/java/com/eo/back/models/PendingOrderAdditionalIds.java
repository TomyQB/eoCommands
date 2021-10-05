package com.eo.back.models;

import java.io.Serializable;

public class PendingOrderAdditionalIds implements Serializable{

    private long restaurantId;
    private int tableNum;
    private long additionalId;

    public PendingOrderAdditionalIds(long restaurantId, int tableNum, long additionalId) {
        this.restaurantId = restaurantId;
        this.tableNum = tableNum;
        this.additionalId = additionalId;
    }

    public PendingOrderAdditionalIds() {
    }
}
