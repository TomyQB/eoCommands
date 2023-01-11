package com.eo.back.services.PendingOrder;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.pendingOrders.ChangeTableNumRequest;
import com.eo.back.dto.pendingOrders.DeleteOrderAdditionalRequest;
import com.eo.back.dto.pendingOrders.DeleteOrderPlateRequest;
import com.eo.back.dto.pendingOrders.TableAssemblyRequest;
import com.eo.back.models.Additional;
import com.eo.back.models.Amount;
import com.eo.back.models.Extra;
import com.eo.back.models.PendingOrderAdditional;
import com.eo.back.models.Plate;
import com.eo.back.repositories.AdditionalRepository;
import com.eo.back.repositories.PendingOrderAdditionalRepository;
import com.eo.back.repositories.PlateRepository;
import com.eo.back.services.AdditionalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PendingOrderAdditionalService extends AbstractPendingOrderService<PendingOrderAdditional> {

    @Autowired
    private PendingOrderAdditionalRepository pendingOrderAdditionalRepository;

    @Autowired
    private AdditionalService additionalService;

    @Autowired
    private AdditionalRepository additionalRepository;

    public List<PendingOrderAdditional> getPendingOrderByRestaurantId(long restaurantId) {
        return this.pendingOrderAdditionalRepository.getPendingOrderAdditionalByRestaurantId(restaurantId);
    }

    public List<PendingOrderAdditional> getPendingOrderByRestaurantIdAndTableNum(long restaurantId, int tableNum) {
        return this.pendingOrderAdditionalRepository.getByRestaurantIdAndTableNum(restaurantId,
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
        if (!pendingOrderAdditionalRepository.getByRestaurantIdAndTableNum(
                changeTableNumRequest.getRestaurantId(), changeTableNumRequest.getNewTableNum()).isEmpty()) {
            // TODO: Lanzar excepción, hacer manejador
            throw new NullPointerException();
        }

        List<PendingOrderAdditional> pendingOrderAdditionals = pendingOrderAdditionalRepository
                .getByRestaurantIdAndTableNum(changeTableNumRequest.getRestaurantId(),
                        changeTableNumRequest.getOldTableNum());

        for (PendingOrderAdditional pendingOrderAdditional : pendingOrderAdditionals) {
            pendingOrderAdditionalRepository.delete(pendingOrderAdditional);
            pendingOrderAdditional.setTableNum(changeTableNumRequest.getNewTableNum());
            pendingOrderAdditionalRepository.save(pendingOrderAdditional);
        }
    }

    public void tableAssembly(final TableAssemblyRequest tableAssembly) {

        if (tableNumAlreadyExist(tableAssembly.getRestaurantId(), tableAssembly.getFinalTable())
                && checkFinalTable(tableAssembly) == 0) {
            throw new NullPointerException();
            // TODO: Lanzar excepción
        }

        if (checkFinalTable(tableAssembly) == 1) {
            tableAssembly(tableAssembly.getRestaurantId(), tableAssembly.getSecondTable(),
                    tableAssembly.getFinalTable());

        } else if (checkFinalTable(tableAssembly) == 2) {
            tableAssembly(tableAssembly.getRestaurantId(), tableAssembly.getFirstTable(),
                    tableAssembly.getFinalTable());

        } else {
            tableAssembly(tableAssembly.getRestaurantId(), tableAssembly.getFirstTable(),
                    tableAssembly.getFinalTable());
            tableAssembly(tableAssembly.getRestaurantId(), tableAssembly.getSecondTable(),
                    tableAssembly.getFinalTable());
        }
    }

    private boolean tableNumAlreadyExist(final long restaurantId, final int tableNum) {
        return !pendingOrderAdditionalRepository.getByRestaurantIdAndTableNum(restaurantId,
                tableNum).isEmpty();
    }

    private int checkFinalTable(final TableAssemblyRequest tableAssembly) {
        if (tableAssembly.getFinalTable() == tableAssembly.getFirstTable())
            return 1;
        if (tableAssembly.getFinalTable() == tableAssembly.getSecondTable())
            return 2;
        return 0;
    }

    private void tableAssembly(final long restaurantId, final int tableNum, final int finalTable) {
        List<PendingOrderAdditional> pendingOrderAdditionals = pendingOrderAdditionalRepository
                .getByRestaurantIdAndTableNum(restaurantId, tableNum);

        for (PendingOrderAdditional pendingOrderAdditional : pendingOrderAdditionals) {
            PendingOrderAdditional pendingOrderAdditionalRepeat = pendingOrderAdditionalRepository
                    .getByRestaurantIdAndAdditionalIdAndTableNum(restaurantId, pendingOrderAdditional.getAdditionalId(),
                            finalTable);

            if (Objects.isNull(pendingOrderAdditionalRepeat)) {
                pendingOrderAdditionalRepository.delete(pendingOrderAdditional);
                pendingOrderAdditional.setTableNum(finalTable);
                pendingOrderAdditionalRepository.save(pendingOrderAdditional);
            } else {
                pendingOrderAdditionalRepository.delete(pendingOrderAdditional);
                pendingOrderAdditionalRepeat
                        .setAmount(pendingOrderAdditionalRepeat.getAmount() + pendingOrderAdditional.getAmount());
                pendingOrderAdditionalRepository.save(pendingOrderAdditionalRepeat);
            }
        }
    }

    public void deleteOrder(DeleteOrderAdditionalRequest deleteOrderRequest) {

        PendingOrderAdditional pendingOrderAdditional = pendingOrderAdditionalRepository
                .getByRestaurantIdAndAdditionalIdAndTableNum(deleteOrderRequest.getRestaurantId(),
                        deleteOrderRequest.getAdditionalId(), deleteOrderRequest.getTableNum());

        if (pendingOrderAdditional.getAmount() > deleteOrderRequest.getAmountToDelete()) {
            pendingOrderAdditional
                    .setAmount(pendingOrderAdditional.getAmount() - deleteOrderRequest.getAmountToDelete());
            pendingOrderAdditionalRepository.save(pendingOrderAdditional);
        } else {
            pendingOrderAdditionalRepository.delete(pendingOrderAdditional);
        }

    }

}
