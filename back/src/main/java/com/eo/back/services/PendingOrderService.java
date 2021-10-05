package com.eo.back.services;

import java.util.List;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.PendingOrderPlate;
import com.eo.back.repositories.PendingOrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PendingOrderService {
    
    @Autowired
    private PendingOrderRepository pendingOrderRepository;

    public List<PendingOrderPlate> getPendingOrderByRestaurantId(long restaurantId) {
        return this.pendingOrderRepository.getPendingOrderByRestaurantId(restaurantId);
    }

    public List<PendingOrderPlate> getPendingOrderByRestaurantIdAndTableNum(long restaurantId, int tableNum) {
        return this.pendingOrderRepository.getPendingOrderByRestaurantIdAndTableNum(restaurantId, tableNum);
    }

    public List<PendingOrderPlate> deletePendingOrder(long restaurantId, int tableNum) {
        return this.pendingOrderRepository.deleteAllPendingOrderByRestaurantIdAndTableNum(restaurantId, tableNum);
    }

    public PendingOrderPlate getPendingOrderByMultiplePK(String plateName, long restaurantId, int tableNum) {
        return this.pendingOrderRepository.getPendingOrderByPlateNameAndRestaurantIdAndTableNum(plateName, restaurantId, tableNum);
    }

    public void savePendingOrder(PedidoDTO dto) {

        for (Amount a : dto.getAmounts()) {
            PendingOrderPlate pendingOrder = getPendingOrderByMultiplePK(a.getPlate().getName(), dto.getRestaurantId(), dto.getNumTable());
            if(pendingOrder != null) {
                pendingOrder.setAmount(pendingOrder.getAmount() + a.getAmount());
                this.pendingOrderRepository.save(pendingOrder);
            } else {
                PendingOrderPlate pendingOrder2 = new PendingOrderPlate();
                pendingOrder2.setAmount(a.getAmount());
                pendingOrder2.setPlate(a.getPlate());
                pendingOrder2.setRestaurantId(dto.getRestaurantId());
                pendingOrder2.setTableNum(dto.getNumTable());
                pendingOrder2.setDate(dto.getDate());
                this.pendingOrderRepository.save(pendingOrder2);
            }
        }
    }
}
