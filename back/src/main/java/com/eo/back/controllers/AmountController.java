package com.eo.back.controllers;

import java.util.ArrayList;
import java.util.List;

import com.eo.back.convert.AmountConverter;
import com.eo.back.convert.PlateConverter;
import com.eo.back.dto.PlateDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.Pedido;
import com.eo.back.models.Plate;
import com.eo.back.services.AmountServices;
import com.eo.back.services.PedidoServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AmountController {

    @Autowired
    private PlateConverter plateConverter;
    
    @Autowired
    private AmountConverter amountConverter;

    @Autowired
    private PedidoServices pedidoServices;

    @Autowired
    private AmountServices amountServices;

    @PostMapping("/converter")
    public ResponseEntity<Boolean> pedidoRecived(@RequestBody PlateDTO dto) {

        Amount amount = amountConverter.fromDTO(dto);
        amountServices.addAmountToList(amount);
        
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);

    }
    
}
