package com.eo.back.dto.pendingOrders;

import lombok.Data;

@Data
public class TableAssemblyRequest {

    private long restaurantId;
    private int firstTable;
    private int secondTable;
    private int finalTable;

}
