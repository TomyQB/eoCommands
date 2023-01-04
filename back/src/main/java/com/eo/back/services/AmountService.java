package com.eo.back.services;

import java.util.List;
import java.util.Objects;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.pendingOrders.DeleteOrderPlateRequest;
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

    @Autowired
    private PedidoServices pedidoServices;

    public Amount getAmountById(long id) {
        return amountRepository.getById(id);
    }

    public void saveAmount(Amount amount) {
        amountRepository.save(amount);
    }

    public void deleteOrder(DeleteOrderPlateRequest deleteOrderRequest) {

        List<Pedido> pedidos = pedidoServices.getPedidoByRestaurantIdAndTableNum(deleteOrderRequest.getRestaurantId(),
                deleteOrderRequest.getTableNum());

        for (Pedido pedido : pedidos) {
            Amount amount = amountRepository.findByOrderIdAndPlateId(pedido.getId(), deleteOrderRequest.getPlateId());
            if (Objects.nonNull(amount)) {
                deleteOrder(deleteOrderRequest, amount);
            }
        }
    }

    private void deleteOrder(DeleteOrderPlateRequest deleteOrderRequest, Amount amount) {
        if (amount.getAmount() > deleteOrderRequest.getAmountToDelete()) {
            amount.setAmount(amount.getAmount() -
                    deleteOrderRequest.getAmountToDelete());
            amountRepository.save(amount);
        } else {
            amountRepository.deleteById(amount.getId());
        }
    }
}
