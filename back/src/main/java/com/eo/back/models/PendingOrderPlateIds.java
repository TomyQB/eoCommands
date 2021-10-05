package com.eo.back.models;

import java.io.Serializable;

public class PendingOrderPlateIds implements Serializable{

    private long restaurantId;
    private int tableNum;
    private Plate plate;

    public PendingOrderPlateIds(long restaurantId, int tableNum, Plate plate) {
        this.restaurantId = restaurantId;
        this.tableNum = tableNum;
        this.plate = plate;
    }

    public PendingOrderPlateIds() {
    }
}
