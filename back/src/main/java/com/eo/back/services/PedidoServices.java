package com.eo.back.services;

import com.eo.back.models.Amount;
import com.eo.back.models.Pedido;
import com.eo.back.repositories.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServices {

    @Autowired
    private PedidoRepository repository;
    
    public void savePedido(Pedido pedido) {
        repository.save(pedido);
    }
    
    public void addPedidoToAmount(Pedido pedido) {
        
        for (Amount a : pedido.getAmounts()) {
            a.setOrder(pedido);
        }
    }

    public void deletePedidosById(long idPedido) {
        repository.deleteById(idPedido);
    }

}
