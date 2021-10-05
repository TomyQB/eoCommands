package com.eo.back.models;

import java.io.Serializable;

public class PendingOrderAdditionalIds implements Serializable{

    private long restaurantId;
    private int tableNum;
    private Additional additional;

    public PendingOrderAdditionalIds(long restaurantId, int tableNum, Additional additional) {
        this.restaurantId = restaurantId;
        this.tableNum = tableNum;
        this.additional = additional;
    }

    public PendingOrderAdditionalIds() {
    }
}
