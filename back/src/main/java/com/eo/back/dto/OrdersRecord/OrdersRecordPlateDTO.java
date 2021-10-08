package com.eo.back.dto.OrdersRecord;

import com.eo.back.models.Plate;

import lombok.Data;

@Data
public class OrdersRecordPlateDTO extends OrdersRecordDTO {
    
    private Plate plate;
}
