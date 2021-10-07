package com.eo.back.convert;

import java.util.ArrayList;
import java.util.List;

import com.eo.back.dto.pendingOrders.PendingOrderAdditionalDTO;
import com.eo.back.dto.pendingOrders.PendingOrderDTO;
import com.eo.back.models.PendingOrderAdditional;

import org.springframework.stereotype.Service;

@Service
public class PendingOrderAdditionalConverter {

    public List<PendingOrderDTO> toDTO(List<PendingOrderAdditional> entitys) {
        List<PendingOrderDTO> pendingOrderDTOs = new ArrayList<>();

        for (PendingOrderAdditional entity : entitys) {
            PendingOrderAdditionalDTO pendingOrderAdditionalDTO = new PendingOrderAdditionalDTO();
    
            pendingOrderAdditionalDTO.setAmount(entity.getAmount());
            pendingOrderAdditionalDTO.setDate(entity.getDate());
            pendingOrderAdditionalDTO.setAdditional(entity.getAdditional());
            pendingOrderAdditionalDTO.setPlateAdditionalId(entity.getAdditionalId());
            pendingOrderAdditionalDTO.setRestaurantId(entity.getRestaurantId());
            pendingOrderAdditionalDTO.setSubTotal(entity.getSubTotal());
            pendingOrderAdditionalDTO.setTableNum(entity.getTableNum());

            pendingOrderDTOs.add(pendingOrderAdditionalDTO);
        }

        return pendingOrderDTOs;
    }
    
}
