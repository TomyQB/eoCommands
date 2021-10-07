package com.eo.back.services.PendingOrder;

import java.util.List;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.Extra;
import com.eo.back.models.PendingOrderPlate;
import com.eo.back.repositories.PendingOrderPlateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PendingOrderPlateService extends AbstractPendingOrderService<PendingOrderPlate> {
    
    @Autowired
    private PendingOrderPlateRepository pendingOrderRepository;

    public List<PendingOrderPlate> getPendingOrderByRestaurantId(long restaurantId) {
        return this.pendingOrderRepository.getPendingOrderPlateByRestaurantId(restaurantId);
    }

    public List<PendingOrderPlate> getPendingOrderByRestaurantIdAndTableNum(long restaurantId, int tableNum) {
        return this.pendingOrderRepository.getPendingOrderPlateByRestaurantIdAndTableNum(restaurantId, tableNum);
    }

    public void deletePendingOrder(long restaurantId, int tableNum) {
        this.pendingOrderRepository.deleteAllPendingOrderPlateByRestaurantIdAndTableNum(restaurantId, tableNum);
    }

    public PendingOrderPlate getPendingOrderByMultiplePK(String plateName, long restaurantId, int tableNum) {
        return this.pendingOrderRepository.getPendingOrderPlateByPlateNameAndRestaurantIdAndTableNum(plateName, restaurantId, tableNum);
    }

    public void savePendingOrder(PedidoDTO dto) {

        for (Amount a : dto.getAmounts()) {

            PendingOrderPlate pendingOrderPlate = getPendingOrderByMultiplePK(a.getPlate().getName(), dto.getRestaurantId(), dto.getNumTable());

            if(pendingOrderPlate != null) {
                pendingOrderPlate.setAmount(pendingOrderPlate.getAmount() + a.getAmount());
                this.pendingOrderRepository.save(pendingOrderPlate);

            } else createNewPendingOrderPlate(dto, a);
        }
    }

    private void createNewPendingOrderPlate(PedidoDTO dto, Amount a) {
        PendingOrderPlate pendingOrderPlate2 = new PendingOrderPlate();
        pendingOrderPlate2.setAmount(a.getAmount());
        pendingOrderPlate2.setPlate(a.getPlate());
        pendingOrderPlate2.setPlateId(a.getPlate().getId());
        pendingOrderPlate2.setRestaurantId(dto.getRestaurantId());
        pendingOrderPlate2.setTableNum(dto.getNumTable());
        pendingOrderPlate2.setDate(dto.getDate());
        this.pendingOrderRepository.save(pendingOrderPlate2);
    }

}
