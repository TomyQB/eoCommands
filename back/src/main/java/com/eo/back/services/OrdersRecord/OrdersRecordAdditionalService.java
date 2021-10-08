package com.eo.back.services.OrdersRecord;


import java.util.List;

import com.eo.back.dto.pendingOrders.PendingOrderAdditionalDTO;
import com.eo.back.models.OrdersRecordAdditional;
import com.eo.back.repositories.OrderRecordAdditionalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersRecordAdditionalService extends AbstractOrdersRecordService<OrdersRecordAdditional, PendingOrderAdditionalDTO> {

    @Autowired
    private OrderRecordAdditionalRepository orderRecordAdditionalRepository;
    
    @Override
    public List<OrdersRecordAdditional> getAllOrdersRecordByRestaurantId(long restaurantId) {
        return orderRecordAdditionalRepository.getAllOrdersRecordAdditionalByRestaurantId(restaurantId);
    }

    @Override
    public OrdersRecordAdditional getOrdersRecordByMultiplePK(String additionalName, long restaurantId) {
        return orderRecordAdditionalRepository.getOrdersRecordAdditionalByAdditionalNameAndRestaurantId(additionalName, restaurantId);
    }

    @Override
    public void deleteOrdersRecord(long restaurantId) {
        orderRecordAdditionalRepository.deleteAllOrdersRecordAdditionalByRestaurantId(restaurantId);
    }   

    @Override
    public void saveOrderRecord(PendingOrderAdditionalDTO orderRecord) {
        OrdersRecordAdditional ordersRecordAdditional = getOrdersRecordByMultiplePK(orderRecord.getAdditional().getName(), orderRecord.getRestaurantId());

        if(ordersRecordAdditional != null) {
            ordersRecordAdditional.setAmount(orderRecord.getAmount() + ordersRecordAdditional.getAmount());
            orderRecordAdditionalRepository.save(ordersRecordAdditional);

        } else createNewOrderRecordAdditional(orderRecord);
    }

    private void createNewOrderRecordAdditional(PendingOrderAdditionalDTO orderRecord) {
        OrdersRecordAdditional ordersRecordAdditional2 = new OrdersRecordAdditional();
        ordersRecordAdditional2.setAmount(orderRecord.getAmount());
        ordersRecordAdditional2.setAdditional(orderRecord.getAdditional());
        ordersRecordAdditional2.setAdditionalId(orderRecord.getPlateAdditionalId());
        ordersRecordAdditional2.setRestaurantId(orderRecord.getRestaurantId());
        ordersRecordAdditional2.setSubTotal(orderRecord.getSubTotal());
        ordersRecordAdditional2.setDate(orderRecord.getDate());
        orderRecordAdditionalRepository.save(ordersRecordAdditional2);
    }
    
}
