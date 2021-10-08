package com.eo.back.dto.OrdersRecord;

import com.eo.back.models.Additional;

import lombok.Data;

@Data
public class OrdersRecordAdditionalDTO extends OrdersRecordDTO {
    
    private Additional additional;
}
