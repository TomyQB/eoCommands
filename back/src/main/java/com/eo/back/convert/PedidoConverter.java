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

    public Pedido fromDTO(String name, Pedido pedido) {

        // pedido.setEmail(dto.getEmail());
        // pedido.setTableNum(dto.getNumTable());
        // pedido.setTotal(dto.getTotal());
        pedido.setRestaurant(restaurantServices.getRestaurantByName(name));

        return pedido;
    }

    @Override
    public Pedido fromDTO(PedidoDTO dto) {
        
        Pedido pedido = new Pedido();

        pedido.setAmounts(dto.getAmounts());
        pedido.setDate(dto.getDate());
        pedido.setEmail(dto.getEmail());
        pedido.setRestaurant(restaurantServices.getRestaurantByName(dto.getRestaurantName()));
        pedido.setTableNum(dto.getNumTable());
        pedido.setTotal(dto.getTotal());

        return pedido;
    }
    
}
