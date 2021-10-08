package com.eo.back.convert;

import java.util.ArrayList;
import java.util.List;

import com.eo.back.dto.OrdersRecord.OrdersRecordDTO;
import com.eo.back.dto.OrdersRecord.OrdersRecordPlateDTO;
import com.eo.back.models.OrdersRecordPlate;

import org.springframework.stereotype.Service;

@Service
public class OrdersRecordPlateConverter {

    public List<OrdersRecordDTO> toDTO(List<OrdersRecordPlate> entitys) {
        List<OrdersRecordDTO> pendingOrderDTOs = new ArrayList<>();

        for (OrdersRecordPlate entity : entitys) {
            OrdersRecordPlateDTO pendingOrderPlateDTO = new OrdersRecordPlateDTO();
    
            pendingOrderPlateDTO.setAmount(entity.getAmount());
            pendingOrderPlateDTO.setDate(entity.getDate());
            pendingOrderPlateDTO.setPlate(entity.getPlate());
            pendingOrderPlateDTO.setPlateAdditionalId(entity.getPlateId());
            pendingOrderPlateDTO.setRestaurantId(entity.getRestaurantId());
            pendingOrderPlateDTO.setSubTotal(entity.getSubTotal());

            pendingOrderDTOs.add(pendingOrderPlateDTO);
        }

        return pendingOrderDTOs;
    }
    
}
