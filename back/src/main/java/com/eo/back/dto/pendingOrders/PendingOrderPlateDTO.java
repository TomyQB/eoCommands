package com.eo.back.dto.pendingOrders;

import com.eo.back.models.Plate;

import lombok.Data;

@Data
public class PendingOrderPlateDTO extends PendingOrderDTO {
    
    private Plate plate;
}
