package com.eo.back.dto.pendingOrders;

import lombok.Data;

@Data
public class DeleteOrderRequest {

    private long restaurantId;
    private long orderId;
    private long plateId;
    private int amountToDelete;
    private int tableNum;
}
