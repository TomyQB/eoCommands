package com.eo.back.dto.pendingOrders;

import lombok.Data;

@Data
public class ChangeTableNumRequest {
    
    private long restaurantId;
    private int oldTableNum;
    private int newTableNum;
}
