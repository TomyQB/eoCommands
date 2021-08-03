package com.eo.back.controllers;

import java.util.List;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.PendingOrder;
import com.eo.back.services.PendingOrderService;

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
    private PendingOrderService pendingOrderService;

    @PostMapping("/madePendingOrder")
    public ResponseEntity<Boolean> madePedido(@RequestBody PedidoDTO dto) {

        pendingOrderService.savePendingOrder(dto);
        
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PostMapping("/allPendingOrder")
    public ResponseEntity<List<PendingOrder>> getPendingOrder(@RequestBody long restaurantId) {

        List<PendingOrder> pendingOrders = pendingOrderService.getPendingOrderByRestaurantId(restaurantId);
        
        return new ResponseEntity<List<PendingOrder>>(pendingOrders, HttpStatus.OK);
    }

    @PostMapping("/filterPendingOrder")
    public ResponseEntity<List<PendingOrder>> filterPendingOrder(@RequestBody long restaurantId, int tableNum) {

        List<PendingOrder> pendingOrders = pendingOrderService.getPendingOrderByRestaurantId(restaurantId);
        
        return new ResponseEntity<List<PendingOrder>>(pendingOrders, HttpStatus.OK);
    }

    @PostMapping("/deletePendingOrder")
    public ResponseEntity<Boolean> deletePendingOrder(@RequestBody long restaurantId, int tableNum) {

        pendingOrderService.deletePendingOrder(restaurantId, tableNum);
        
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
    
}
