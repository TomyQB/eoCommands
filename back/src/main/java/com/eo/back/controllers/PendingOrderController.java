package com.eo.back.controllers;

import java.util.ArrayList;
import java.util.List;

import com.eo.back.convert.OrdersRecordAdditionalConverter;
import com.eo.back.convert.OrdersRecordPlateConverter;
import com.eo.back.convert.PendingOrderAdditionalConverter;
import com.eo.back.convert.PendingOrderPlateConverter;
import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.OrdersRecord.OrdersRecordDTO;
import com.eo.back.dto.pendingOrders.ChangeTableNumRequest;
import com.eo.back.dto.pendingOrders.PendingOrderAdditionalDTO;
import com.eo.back.dto.pendingOrders.PendingOrderDTO;
import com.eo.back.dto.pendingOrders.PendingOrderPlateDTO;
import com.eo.back.models.OrdersRecordAdditional;
import com.eo.back.models.OrdersRecordPlate;
import com.eo.back.models.PendingOrderAdditional;
import com.eo.back.models.PendingOrderPlate;
import com.eo.back.services.PedidoServices;
import com.eo.back.services.OrdersRecord.OrdersRecordAdditionalService;
import com.eo.back.services.OrdersRecord.OrdersRecordPlateService;
import com.eo.back.services.PendingOrder.PendingOrderAdditionalService;
import com.eo.back.services.PendingOrder.PendingOrderPlateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    private PendingOrderPlateConverter pendingOrderPlateConverter;

    @Autowired
    private PendingOrderAdditionalConverter pendingOrderAdditionalConverter;

    @Autowired
    private OrdersRecordAdditionalService ordersRecordAdditionalService;
    
    @Autowired
    private OrdersRecordPlateService ordersRecordPlateService;
    
    @Autowired
    private OrdersRecordAdditionalConverter ordersRecordAdditionalConverter;

    @Autowired
    private OrdersRecordPlateConverter ordersRecordPlateConverter;

    @Autowired
    private PedidoServices pedidoServices;


    @PostMapping("/madePendingOrder")
    public ResponseEntity<Boolean> madePendingOrder(@RequestBody PedidoDTO dto) {

        pendingOrderPlateService.savePendingOrder(dto);
        pendingOrderAdditionalService.savePendingOrder(dto);
        
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PostMapping("/allPendingOrder")
    public List<PendingOrderDTO> getPendingOrder(@RequestBody long restaurantId) {

        List<PendingOrderPlate> pendingOrdersPlate = pendingOrderPlateService.getPendingOrderByRestaurantId(restaurantId);
        List<PendingOrderAdditional> pendingOrderAdditionals = pendingOrderAdditionalService.getPendingOrderByRestaurantId(restaurantId);
        
        return mergeTwoPendingOrderList(pendingOrdersPlate, pendingOrderAdditionals);
    }

    @PostMapping("/deletePendingOrder")
    public List<PendingOrderDTO> deletePendingOrder(@RequestBody PedidoDTO dto) {        
        List<PendingOrderPlate> pendingOrdersPlate = pendingOrderPlateService.deletePendingOrder(dto.getRestaurantId(), dto.getNumTable());
        List<PendingOrderAdditional> pendingOrderAdditionals = pendingOrderAdditionalService.deletePendingOrder(dto.getRestaurantId(), dto.getNumTable());

        return mergeTwoPendingOrderList(pendingOrdersPlate, pendingOrderAdditionals);
    }

    private List<PendingOrderDTO> mergeTwoPendingOrderList(List<PendingOrderPlate> pendingOrdersPlate, List<PendingOrderAdditional> pendingOrderAdditionals) {

        List<PendingOrderDTO> pendingOrderDTOs = new ArrayList<>();

        List<PendingOrderDTO> pendingOrderPlateDTOs = pendingOrderPlateConverter.toDTO(pendingOrdersPlate);
        List<PendingOrderDTO> pendingOrderAdditionalDTOs = pendingOrderAdditionalConverter.toDTO(pendingOrderAdditionals);

        pendingOrderDTOs.addAll(pendingOrderPlateDTOs);
        pendingOrderDTOs.addAll(pendingOrderAdditionalDTOs);

        return pendingOrderDTOs;
    }

    
    @PostMapping("/madePendingOrderPlateRecord")
    public void madePendingOrderRecord(@RequestBody PendingOrderPlateDTO dto) {

        ordersRecordPlateService.saveOrderRecord(dto);
    }
    
    @PostMapping("/madePendingOrderAdditionalRecord")
    public void madePendingOrderRecord(@RequestBody PendingOrderAdditionalDTO dto) {

        ordersRecordAdditionalService.saveOrderRecord(dto);
    }
    
    @PostMapping("/allOrderRecord")
    public List<OrdersRecordDTO> getOrderRecord(@RequestBody long restaurantId) {

        List<OrdersRecordPlate> ordersRecordPlates = ordersRecordPlateService.getAllOrdersRecordByRestaurantId(restaurantId);
        List<OrdersRecordAdditional> ordersRecordAdditionals = ordersRecordAdditionalService.getAllOrdersRecordByRestaurantId(restaurantId);
        
        return mergeTwoOrderRecordList(ordersRecordPlates, ordersRecordAdditionals);
    }
    
    @PostMapping("/deleteOrdersRecord")
    public void deleteOrdersRecord(@RequestBody long restaurantId) {        
        ordersRecordPlateService.deleteOrdersRecord(restaurantId);
        ordersRecordAdditionalService.deleteOrdersRecord(restaurantId);
    }
    
    private List<OrdersRecordDTO> mergeTwoOrderRecordList(List<OrdersRecordPlate> ordersRecordPlate, List<OrdersRecordAdditional> ordersRecordAdditionals) {

        List<OrdersRecordDTO> ordersRecordDTOs= new ArrayList<>();

        List<OrdersRecordDTO> ordersRecordPlateDTOs = ordersRecordPlateConverter.toDTO(ordersRecordPlate);
        List<OrdersRecordDTO> ordersRecordAdditionalDTOs = ordersRecordAdditionalConverter.toDTO(ordersRecordAdditionals);

        ordersRecordDTOs.addAll(ordersRecordPlateDTOs);
        ordersRecordDTOs.addAll(ordersRecordAdditionalDTOs);

        return ordersRecordDTOs;
    }

    @PutMapping("changeTableNum")
    public void changeTableNum(@RequestBody ChangeTableNumRequest changeTableNumRequest) {
        pedidoServices.changeTableNum(changeTableNumRequest);
        pendingOrderPlateService.changeTableNum(changeTableNumRequest);
        pendingOrderAdditionalService.changeTableNum(changeTableNumRequest);
    }
    
}
