package com.eo.back.convert;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Pedido;
import com.eo.back.services.RestaurantServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoConverter extends AbstractConverter<Pedido, PedidoDTO>{

    @Autowired
    private RestaurantServices restaurantServices;

    @Override
    public Pedido fromDTO(PedidoDTO dto) {

        Pedido pedido = new Pedido();
        pedido.setEmail(dto.getEmail());
        pedido.setTableNum(dto.getNumTable());
        pedido.setTotal(dto.getTotal());
        pedido.setRestaurant(restaurantServices.getRestaurantById(dto.getIdRestaurant()));

        return pedido;
    }
    
}
