package com.eo.back.controllers;

import java.util.List;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.PendingOrderPlate;
import com.eo.back.services.PedidoServices;
import com.eo.back.services.RestaurantServices;
import com.eo.back.services.Email.PendingOrderEmailService;
import com.eo.back.services.PendingOrder.PendingOrderAdditionalService;
import com.eo.back.services.PendingOrder.PendingOrderPlateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PendingOrderController {

    @Autowired
    private PendingOrderPlateService pendingOrderPlateService;
    
    @Autowired
    private PendingOrderAdditionalService pendingOrderAdditionalService;
    
    @Autowired
    private RestaurantServices restaurantServices;
    
    @Autowired
    private PendingOrderEmailService pendingOrderEmailService;
    
    @Autowired
    private PedidoServices pedidoServices;

    @PostMapping("/madePendingOrder")
    public ResponseEntity<Boolean> madePedido(@RequestBody PedidoDTO dto) {

        pendingOrderPlateService.savePendingOrder(dto);
        pendingOrderAdditionalService.savePendingOrder(dto);
        
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PostMapping("/allPendingOrder")
    public ResponseEntity<List<PendingOrderPlate>> getPendingOrder(@RequestBody long userId) {

        List<PendingOrderPlate> pendingOrders = pendingOrderPlateService.getPendingOrderByRestaurantId(restaurantServices.getRestaurantById(userId).getId());
        
        return new ResponseEntity<List<PendingOrderPlate>>(pendingOrders, HttpStatus.OK);
    }

    @PostMapping("/filterPendingOrder")
    public ResponseEntity<List<PendingOrderPlate>> filterPendingOrder(@RequestBody PedidoDTO dto) {
        
        List<PendingOrderPlate> pendingOrders = pendingOrderPlateService.getPendingOrderByRestaurantIdAndTableNum(restaurantServices.getRestaurantById(dto.getRestaurantId()).getId(), dto.getNumTable());
        
        return new ResponseEntity<List<PendingOrderPlate>>(pendingOrders, HttpStatus.OK);
    }

    @PostMapping("/deletePendingOrder")
    public ResponseEntity<Boolean> deletePendingOrder(@RequestBody PedidoDTO dto) {
        
        List<PendingOrderPlate> pendingOrders = pendingOrderPlateService.deletePendingOrder(restaurantServices.getRestaurantById(dto.getRestaurantId()).getId(), dto.getNumTable());
        String email = pedidoServices.deletePedido(dto);
        pendingOrderEmailService.sendEmail(pendingOrders, email);

        // restaurantServices.updateOrdersAmount(dto.getRestaurantId());
        
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
    
}
