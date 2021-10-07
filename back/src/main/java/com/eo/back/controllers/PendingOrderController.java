package com.eo.back.controllers;

import java.util.ArrayList;
import java.util.List;

import com.eo.back.convert.PendingOrderAdditionalConverter;
import com.eo.back.convert.PendingOrderPlateConverter;
import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.pendingOrders.PendingOrderDTO;
import com.eo.back.dto.pendingOrders.PendingOrderPlateDTO;
import com.eo.back.models.PendingOrderAdditional;
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

    @Autowired
    private PendingOrderPlateConverter pendingOrderPlateConverter;

    @Autowired
    private PendingOrderAdditionalConverter pendingOrderAdditionalConverter;

    @PostMapping("/madePendingOrder")
    public ResponseEntity<Boolean> madePedido(@RequestBody PedidoDTO dto) {

        pendingOrderPlateService.savePendingOrder(dto);
        pendingOrderAdditionalService.savePendingOrder(dto);
        
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PostMapping("/allPendingOrder")
    public List<PendingOrderDTO> getPendingOrder(@RequestBody long restaurantId) {

        List<PendingOrderPlate> pendingOrdersPlate = pendingOrderPlateService.getPendingOrderByRestaurantId(restaurantId);
        List<PendingOrderDTO> pendingOrderPlateDTOs = pendingOrderPlateConverter.toDTO(pendingOrdersPlate);
        
        List<PendingOrderAdditional> pendingOrderAdditionals = pendingOrderAdditionalService.getPendingOrderByRestaurantId(restaurantId);
        List<PendingOrderDTO> pendingOrderAdditionalDTOs = pendingOrderAdditionalConverter.toDTO(pendingOrderAdditionals);

        List<PendingOrderDTO> pendingOrderDTOs = new ArrayList<>();
        pendingOrderDTOs.addAll(pendingOrderPlateDTOs);
        pendingOrderDTOs.addAll(pendingOrderAdditionalDTOs);
        
        return pendingOrderDTOs;
    }

    @PostMapping("/filterPendingOrder")
    public ResponseEntity<List<PendingOrderPlate>> filterPendingOrder(@RequestBody PedidoDTO dto) {
        
        List<PendingOrderPlate> pendingOrders = pendingOrderPlateService.getPendingOrderByRestaurantIdAndTableNum(restaurantServices.getRestaurantById(dto.getRestaurantId()).getId(), dto.getNumTable());
        
        return new ResponseEntity<List<PendingOrderPlate>>(pendingOrders, HttpStatus.OK);
    }

    @PostMapping("/deletePendingOrder")
    public void deletePendingOrder(@RequestBody PedidoDTO dto) {        
        pendingOrderPlateService.deletePendingOrder(dto.getRestaurantId(), dto.getNumTable());
        pendingOrderAdditionalService.deletePendingOrder(dto.getRestaurantId(), dto.getNumTable());
    }
    
}
