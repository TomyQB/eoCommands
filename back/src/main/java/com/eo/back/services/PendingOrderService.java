package com.eo.back.services;

import java.util.List;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.PendingOrder;
import com.eo.back.repositories.PendingOrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PendingOrderService {
    
    @Autowired
    private PendingOrderRepository pendingOrderRepository;

    public List<PendingOrder> getPendingOrderByRestaurantId(long restaurantId) {
        return this.pendingOrderRepository.getPendingOrderByRestaurantId(restaurantId);
    }

    public List<PendingOrder> getPendingOrderByRestaurantIdAndTableNum(long restaurantId, int tableNum) {
        return this.pendingOrderRepository.getPendingOrderByRestaurantIdAndTableNum(restaurantId, tableNum);
    }

    public List<PendingOrder> deletePendingOrder(long restaurantId, int tableNum) {
        return this.pendingOrderRepository.deleteAllPendingOrderByRestaurantIdAndTableNum(restaurantId, tableNum);
    }

    public PendingOrder getPendingOrderByMultiplePK(String plateName, long restaurantId, int tableNum) {
        return this.pendingOrderRepository.getPendingOrderByPlateNameAndRestaurantIdAndTableNum(plateName, restaurantId, tableNum);
    }

    public void savePendingOrder(PedidoDTO dto) {

        for (Amount a : dto.getAmounts()) {
            PendingOrder pendingOrder = getPendingOrderByMultiplePK(a.getPlate().getName(), dto.getRestaurantId(), dto.getNumTable());
            if(pendingOrder != null) {
                pendingOrder.setAmount(pendingOrder.getAmount() + a.getAmount());
                this.pendingOrderRepository.save(pendingOrder);
            } else {
                PendingOrder pendingOrder2 = new PendingOrder();
                pendingOrder2.setAmount(a.getAmount());
                pendingOrder2.setPlateName(a.getPlate().getName());
                pendingOrder2.setRestaurantId(dto.getRestaurantId());
                pendingOrder2.setTableNum(dto.getNumTable());
                pendingOrder2.setDate(dto.getDate());
                this.pendingOrderRepository.save(pendingOrder2);
            }
        }
    }
}
