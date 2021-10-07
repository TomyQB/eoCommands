package com.eo.back.controllers;


import com.eo.back.dto.AmountDTO;
import com.eo.back.models.Amount;
import com.eo.back.services.AmountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AmountController {

    @Autowired
    private AmountService amountService;
            
    @PostMapping("/changeEstadoAmount")
    public void changeEstadoAmount(@RequestBody AmountDTO dto) {
        System.out.println("Cambiando estado amount");
        Amount amount = amountService.getAmountById(dto.getId());
        amount.setEstado(dto.getEstado());
        amountService.saveAmount(amount);
        
    }
}
