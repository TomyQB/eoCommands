package com.eo.back.dto.pendingOrders;

import com.eo.back.models.Additional;

import lombok.Data;

@Data
public class PendingOrderAdditionalDTO extends PendingOrderDTO {
    
    private Additional additional;
}
