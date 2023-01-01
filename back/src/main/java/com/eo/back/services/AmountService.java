package com.eo.back.services;

import java.util.List;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.pendingOrders.DeleteOrderRequest;
import com.eo.back.models.Amount;
import com.eo.back.models.Pedido;
import com.eo.back.repositories.AmountRepository;
import com.eo.back.repositories.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AmountService {

    @Autowired
    private AmountRepository amountRepository;

    public Amount getAmountById(long id) {
        return amountRepository.getById(id);
    }

    public void saveAmount(Amount amount) {
        amountRepository.save(amount);
    }

    public void deleteOrder(DeleteOrderRequest deleteOrderRequest) {
        Amount amount = amountRepository.findByPlateIdAndOrderId(deleteOrderRequest.getPlateId(),
                deleteOrderRequest.getOrderId());

        if (amount.getAmount() > deleteOrderRequest.getAmountToDelete()) {
            amount.setAmount(amount.getAmount() - deleteOrderRequest.getAmountToDelete());
            amountRepository.save(amount);
        } else {
            amountRepository.deleteById(amount.getId());
        }
    }
}
