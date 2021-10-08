package com.eo.back.dto.OrdersRecord;

import lombok.Data;

@Data
public class OrdersRecordDTO {

    private long restaurantId;
    private long plateAdditionalId;
    private double subTotal;
    private int amount;
    private String date;
    
}
