package com.eo.back.services.PendingOrder;

import java.util.List;

import javax.transaction.Transactional;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.pendingOrders.ChangeTableNumRequest;
import com.eo.back.dto.pendingOrders.DeleteOrderRequest;
import com.eo.back.models.Additional;
import com.eo.back.models.Amount;
import com.eo.back.models.Extra;
import com.eo.back.models.PendingOrderAdditional;
import com.eo.back.repositories.PendingOrderAdditionalRepository;
import com.eo.back.services.AdditionalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PendingOrderAdditionalService extends AbstractPendingOrderService<PendingOrderAdditional> {

    @Autowired
    private PendingOrderAdditionalRepository pendingOrderAdditionalRepository;

    @Autowired
    private AdditionalService additionalService;

    public List<PendingOrderAdditional> getPendingOrderByRestaurantId(long restaurantId) {
        return this.pendingOrderAdditionalRepository.getPendingOrderAdditionalByRestaurantId(restaurantId);
    }

    public List<PendingOrderAdditional> getPendingOrderByRestaurantIdAndTableNum(long restaurantId, int tableNum) {
        return this.pendingOrderAdditionalRepository.getPendingOrderAdditionalByRestaurantIdAndTableNum(restaurantId,
                tableNum);
    }

    public List<PendingOrderAdditional> deletePendingOrder(long restaurantId, int tableNum) {
        return this.pendingOrderAdditionalRepository
                .deleteAllPendingOrderAdditionalByRestaurantIdAndTableNum(restaurantId, tableNum);
    }

    public PendingOrderAdditional getPendingOrderByMultiplePK(String additionalName, long restaurantId, int tableNum) {
        return this.pendingOrderAdditionalRepository
                .getPendingOrderAdditionalByAdditionalNameAndRestaurantIdAndTableNum(additionalName, restaurantId,
                        tableNum);
    }

    public void savePendingOrder(PedidoDTO dto) {

        for (Amount a : dto.getAmounts()) {

            if (!a.getExtras().isEmpty()) {
                for (Extra e : a.getExtras()) {
                    PendingOrderAdditional pendingOrderAdditional = getPendingOrderByMultiplePK(e.getName(),
                            dto.getRestaurantId(), dto.getNumTable());

                    if (pendingOrderAdditional != null) {
                        pendingOrderAdditional.setAmount(pendingOrderAdditional.getAmount() + 1);
                        this.pendingOrderAdditionalRepository.save(pendingOrderAdditional);

                    } else
                        createNewPendingOrderAdditional(dto, e, a);
                }
            }
        }
    }

    private void createNewPendingOrderAdditional(PedidoDTO dto, Extra e, Amount a) {
        PendingOrderAdditional pendingOrderAdditional2 = new PendingOrderAdditional();
        pendingOrderAdditional2.setAmount(1);
        Additional additional = additionalService.getAdditionalByNameAndPlateId(e.getName(), a.getPlate().getId());
        pendingOrderAdditional2.setAdditional(additional);
        pendingOrderAdditional2.setAdditionalId(additional.getId());
        pendingOrderAdditional2.setRestaurantId(dto.getRestaurantId());
        pendingOrderAdditional2.setTableNum(dto.getNumTable());
        pendingOrderAdditional2.setDate(dto.getDate());
        this.pendingOrderAdditionalRepository.save(pendingOrderAdditional2);
    }

    public void changeTableNum(final ChangeTableNumRequest changeTableNumRequest) {
        if (!pendingOrderAdditionalRepository.getPendingOrderAdditionalByRestaurantIdAndTableNum(
                changeTableNumRequest.getRestaurantId(), changeTableNumRequest.getNewTableNum()).isEmpty()) {
            // TODO: Lanzar excepción, hacer manejador
            throw new NullPointerException();
        }

        List<PendingOrderAdditional> pendingOrderAdditionals = pendingOrderAdditionalRepository
                .getPendingOrderAdditionalByRestaurantIdAndTableNum(changeTableNumRequest.getRestaurantId(),
                        changeTableNumRequest.getOldTableNum());

        for (PendingOrderAdditional pendingOrderAdditional : pendingOrderAdditionals) {
            pendingOrderAdditionalRepository.delete(pendingOrderAdditional);
            pendingOrderAdditional.setTableNum(changeTableNumRequest.getNewTableNum());
            pendingOrderAdditionalRepository.save(pendingOrderAdditional);
        }
    }

    public void deleteOrder(DeleteOrderRequest deleteOrderRequest) {

    }

}
