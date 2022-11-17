package com.eo.back.dto.pendingOrders;

import com.eo.back.models.PendingOrderPlate;
import com.eo.back.models.Plate;

import lombok.Data;

@Data
public class PendingOrderCuentaDTO {

    private long restaurantId;
    private Plate plate;
    private int tableNum;
    private long plateAdditionalId;
    private double subTotal;
    private int amount;
    private String date;
    
}
