package com.eo.back.services;

import java.util.List;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.Pedido;
import com.eo.back.repositories.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServices {

    @Autowired
    private PedidoRepository repository;
    
    @Autowired
    private RestaurantServices restaurantServices;

    public Pedido getPedidoById(long id) {
        return repository.getById(id);
    }
    
    public void savePedido(Pedido pedido) {
        repository.save(pedido);
    }

    public void deletePedido(PedidoDTO dto) {
        repository.deleteAllPedidoByRestaurantIdAndTableNum(restaurantServices.getRestaurantById(dto.getRestaurantId()).getId(), dto.getNumTable());
    }

    public void deletePedidosById(long idPedido) {
        repository.deleteById(idPedido);
    }
        
    public void addPedidoToAmount(Pedido pedido) {
        
        for (Amount a : pedido.getAmounts()) {
            a.setOrder(pedido);
        }
    }

}
