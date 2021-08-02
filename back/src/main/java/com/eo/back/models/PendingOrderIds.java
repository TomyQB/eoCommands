package com.eo.back.models;

import java.io.Serializable;

public class PendingOrderIds implements Serializable{

    private long restaurantId;
    private int tableNum;
    private String plateName;

    public PendingOrderIds(long restaurantId, int tableNum, String plateName) {
        this.restaurantId = restaurantId;
        this.tableNum = tableNum;
        this.plateName = plateName;
    }

    public PendingOrderIds() {
    }
}
