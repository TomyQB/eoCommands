package com.eo.back.dto.pendingOrders;

import lombok.Data;

@Data
public class DeleteOrderPlateRequest {

    private long restaurantId;
    private long plateId;
    private int amountToDelete;
    private int tableNum;
}
