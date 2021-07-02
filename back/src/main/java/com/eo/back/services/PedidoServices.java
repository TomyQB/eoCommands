package com.eo.back.services;

import com.eo.back.models.Pedido;
import com.eo.back.repositories.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServices {

    @Autowired
    private PedidoRepository repository;
    
    public void madePedido(Pedido pedido) {
        repository.save(pedido);
    }
}
