package com.eo.back.models;

import java.io.Serializable;

public class PendingOrderPlateIds implements Serializable{

    private long restaurantId;
    private int tableNum;
    private long plateId;

    public PendingOrderPlateIds(long restaurantId, int tableNum, long plateId) {
        this.restaurantId = restaurantId;
        this.tableNum = tableNum;
        this.plateId = plateId;
    }

    public PendingOrderPlateIds() {
    }
}
