package com.eo.back.convert;

import java.util.ArrayList;
import java.util.List;

import com.eo.back.dto.pendingOrders.PendingOrderDTO;
import com.eo.back.dto.pendingOrders.PendingOrderPlateDTO;
import com.eo.back.models.PendingOrderPlate;

import org.springframework.stereotype.Service;

@Service
public class PendingOrderPlateConverter {

    public List<PendingOrderDTO> toDTO(List<PendingOrderPlate> entitys) {
        List<PendingOrderDTO> pendingOrderDTOs = new ArrayList<>();

        for (PendingOrderPlate entity : entitys) {
            PendingOrderPlateDTO pendingOrderPlateDTO = new PendingOrderPlateDTO();
    
            pendingOrderPlateDTO.setAmount(entity.getAmount());
            pendingOrderPlateDTO.setDate(entity.getDate());
            pendingOrderPlateDTO.setPlate(entity.getPlate());
            pendingOrderPlateDTO.setPlateAdditionalId(entity.getPlateId());
            pendingOrderPlateDTO.setRestaurantId(entity.getRestaurantId());
            pendingOrderPlateDTO.setSubTotal(entity.getSubTotal());
            pendingOrderPlateDTO.setTableNum(entity.getTableNum());

            pendingOrderDTOs.add(pendingOrderPlateDTO);
        }

        return pendingOrderDTOs;
    }
    
}
