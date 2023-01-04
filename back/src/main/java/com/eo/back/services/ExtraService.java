package com.eo.back.services;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.pendingOrders.DeleteOrderAdditionalRequest;
import com.eo.back.dto.pendingOrders.DeleteOrderPlateRequest;
import com.eo.back.models.Additional;
import com.eo.back.models.Amount;
import com.eo.back.models.Extra;
import com.eo.back.models.Pedido;
import com.eo.back.models.Plate;
import com.eo.back.repositories.AdditionalRepository;
import com.eo.back.repositories.AmountRepository;
import com.eo.back.repositories.ExtraRepository;
import com.eo.back.repositories.PedidoRepository;
import com.eo.back.repositories.PlateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExtraService {

    @Autowired
    private AmountRepository amountRepository;

    @Autowired
    private ExtraRepository extraRepository;

    @Autowired
    private PedidoServices pedidoServices;

    @Autowired
    private AdditionalRepository additionalRepository;

    public Amount getAmountById(long id) {
        return amountRepository.getById(id);
    }

    public void saveAmount(Amount amount) {
        amountRepository.save(amount);
    }

    public void deleteOrder(DeleteOrderAdditionalRequest deleteOrderRequest) {

        Optional<Additional> additional = additionalRepository.findById(deleteOrderRequest.getAdditionalId());

        if (additional.isPresent()) {
            List<Pedido> pedidos = pedidoServices.getPedidoByRestaurantIdAndTableNum(
                    deleteOrderRequest.getRestaurantId(),
                    deleteOrderRequest.getTableNum());

            for (Pedido pedido : pedidos) {
                Amount amount = amountRepository.findByOrderIdAndPlateId(pedido.getId(),
                        additional.get().getPlate().getId());
                if (Objects.nonNull(amount)) {
                    Extra extra = extraRepository.findByNameAndAmountId(deleteOrderRequest.getName(), amount.getId());
                    extraRepository.deleteById(extra.getId());
                }
            }
        }

    }
}
