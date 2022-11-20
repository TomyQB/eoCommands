package com.eo.back.controllers;

import java.util.List;

import com.eo.back.dto.PrintTextDTO;
import com.eo.back.dto.pendingOrders.PendingOrderCuentaDTO;
import com.eo.back.models.Pedido;
import com.eo.back.services.Printer.PrintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PrinterController {

    @Autowired
    private PrintService printService;

    @PostMapping("/generateTicketCuenta")
    public PrintTextDTO generateTicketCuenta(@RequestBody List<PendingOrderCuentaDTO> pendingOrderDTOs) {
        return printService.generateTicketCuenta(pendingOrderDTOs);
    }
    
    @PostMapping("/generateTicketFood")
    public PrintTextDTO generateTicketFood(@RequestBody Pedido pedidos) {
        return printService.generateTicketFood(pedidos);
    }
    
    @PostMapping("/generateTicketDrink")
    public PrintTextDTO generateTicketDrink(@RequestBody Pedido pedidos) {
        return printService.generateTicketDrink(pedidos);
    }
}
