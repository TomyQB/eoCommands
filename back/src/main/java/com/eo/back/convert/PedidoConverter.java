package com.eo.back.convert;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.Pedido;
import com.eo.back.models.Plate;
import com.eo.back.services.RestaurantServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoConverter extends AbstractConverter<Pedido, PedidoDTO> {

    @Autowired
    private RestaurantServices restaurantServices;

    private double total = 0;

    @Override
    public Pedido fromDTO(PedidoDTO dto) {

        Pedido pedido = new Pedido();
        
        List<Amount> amounts = createAmountList(dto.getPlates());

        pedido.setAmounts(amounts);
        pedido.setEmail(dto.getEmail());
        pedido.setTableNum(dto.getTableNum());
        pedido.setRestaurant(restaurantServices.getRestaurantById(dto.getRestaurantId()));
        pedido.setDate(calculateDate());
        pedido.setTotal(total);
        
        return pedido;
    }

    private List<Amount> createAmountList(List<Plate> plates) {

        List<Amount> amounts = new ArrayList<Amount>();

        for (Plate p : plates) {
            Amount a = new Amount();

            System.out.println(p.toString());

            // a.setPlate(p);
            a.setAmount(p.getAmount().getAmount());
            a.setDescription(p.getAmount().getDescription());
            a.setSubTotal(p.getPrice() * a.getAmount());

            total += a.getSubTotal();
            
            amounts.add(a);
        }

        return amounts;
    }

    private String calculateDate() {
        SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
        String dateString = date.format(new Date());

        return dateString;
    }
    
}
