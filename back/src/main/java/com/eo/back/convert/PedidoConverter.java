package com.eo.back.convert;

import java.util.List;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.Extra;
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

        pedido.setAmounts(dto.getAmounts());
        pedido.setDate(dto.getDate());
        pedido.setEmail(dto.getEmail());
        pedido.setRestaurant(restaurantServices.getRestaurantById(dto.getRestaurantId()));
        pedido.setTableNum(dto.getNumTable());
        pedido.setTotal(dto.getTotal());
        pedido.setPhoneNumber(dto.getPhoneNumber());
        pedido.setDrinkCount(dto.getDrinkCount());
        pedido.setFoodCount(dto.getFoodCount());
        pedido.setEstadoFood(dto.getEstadoFood());
        pedido.setEstadoDrink(dto.getEstadoDrink());
        pedido.setHechosFood(0);
        pedido.setHechosDrink(0);

        addAmountToAdditionals(dto.getAmounts());

        return pedido;
    }

    private void addAmountToAdditionals(List<Amount> amounts) {
        for (Amount amount : amounts) {
            if(amount.getExtras() != null) {
                for (Extra extra : amount.getExtras()) {
                    extra.setAmount(amount);
                }
            }
        }
    }

    @Override
    public PedidoDTO toDTO(Pedido entity) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
