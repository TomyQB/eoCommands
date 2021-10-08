package com.eo.back.convert;

import java.util.ArrayList;
import java.util.List;

import com.eo.back.dto.OrdersRecord.OrdersRecordAdditionalDTO;
import com.eo.back.dto.OrdersRecord.OrdersRecordDTO;
import com.eo.back.models.OrdersRecordAdditional;

import org.springframework.stereotype.Service;

@Service
public class OrdersRecordAdditionalConverter {

    public List<OrdersRecordDTO> toDTO(List<OrdersRecordAdditional> entitys) {
        List<OrdersRecordDTO> pendingOrderDTOs = new ArrayList<>();

        for (OrdersRecordAdditional entity : entitys) {
            OrdersRecordAdditionalDTO pendingOrderAdditionalDTO = new OrdersRecordAdditionalDTO();
    
            pendingOrderAdditionalDTO.setAmount(entity.getAmount());
            pendingOrderAdditionalDTO.setDate(entity.getDate());
            pendingOrderAdditionalDTO.setAdditional(entity.getAdditional());
            pendingOrderAdditionalDTO.setPlateAdditionalId(entity.getAdditionalId());
            pendingOrderAdditionalDTO.setRestaurantId(entity.getRestaurantId());
            pendingOrderAdditionalDTO.setSubTotal(entity.getSubTotal());

            pendingOrderDTOs.add(pendingOrderAdditionalDTO);
        }

        return pendingOrderDTOs;
    }
    
}
