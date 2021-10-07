package com.eo.back.dto.pendingOrders;

import lombok.Data;

@Data
public class PendingOrderDTO {

    private long restaurantId;
    private int tableNum;
    private long plateAdditionalId;
    private double subTotal;
    private int amount;
    private String date;
    
}
