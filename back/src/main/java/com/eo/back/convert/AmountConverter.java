package com.eo.back.convert;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.eo.back.dto.PlateDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.Plate;
import com.eo.back.services.PedidoServices;
import com.eo.back.services.RestaurantServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AmountConverter extends AbstractConverter<Amount, PlateDTO> {

    @Autowired
    private PlateConverter converter;

    @Autowired
    private PedidoServices pedidoServices;

    @Override
    public Amount fromDTO(PlateDTO dto) {

        Amount amount = new Amount();

        amount.setAmount(dto.getAmount().getAmount());
        amount.setDescription((String) dto.getAmount().getDescription());
        amount.setSubTotal(this.calculateSubTotal(dto));
        amount.setPlate(converter.fromDTO(dto));
        

        return amount;
    }

    private double calculateSubTotal(PlateDTO dto) {
        double subTotal = dto.getPrice() * dto.getAmount().getAmount();
        return subTotal;
    }
    
    
}
