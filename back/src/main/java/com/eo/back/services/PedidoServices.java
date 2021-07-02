package com.eo.back.services;

import java.util.List;

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

    public List<Pedido> getAllPedidos(long id) {
        return repository.getPedidoByRestaurantId(id);
    }

    public void deletePedidosByTable(int tableNum, long id) {
        List<Pedido> pedidos = repository.getPedidoByTableNumAndRestaurantId(tableNum, id);

        for (Pedido p : pedidos) {
            repository.delete(p);
        }
    }
}
