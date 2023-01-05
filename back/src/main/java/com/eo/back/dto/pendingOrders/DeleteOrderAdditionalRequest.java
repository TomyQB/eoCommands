package com.eo.back.dto.pendingOrders;

import lombok.Data;

@Data
public class DeleteOrderAdditionalRequest {

    private long restaurantId;
    private long additionalId;
    private int tableNum;
    private int amountToDelete;
    private String name;
}
