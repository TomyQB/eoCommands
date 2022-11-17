package com.eo.back.controllers;

import java.util.List;

import com.eo.back.dto.PrintTextDTO;
import com.eo.back.dto.Restaurant.RestaurantPrinterDTO;
import com.eo.back.dto.pendingOrders.PendingOrderCuentaDTO;
import com.eo.back.dto.pendingOrders.PendingOrderDTO;
import com.eo.back.models.RestaurantPrinter;
import com.eo.back.services.RestaurantPrinterService;
import com.eo.back.services.Printer.PrintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PrinterController {

    @Autowired
    private PrintService printService;

    @PostMapping("/generateTicket")
    public PrintTextDTO generateTicket(@RequestBody List<PendingOrderCuentaDTO> pendingOrderDTOs) {
        return printService.generateTicket(pendingOrderDTOs);
    }
}
