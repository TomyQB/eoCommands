package com.eo.back.services;

import java.util.List;

import com.eo.back.dto.PedidoDTO;
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
}
