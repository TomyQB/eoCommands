package com.eo.back.services.OrdersRecord;

import java.util.List;

import com.eo.back.dto.pendingOrders.PendingOrderPlateDTO;
import com.eo.back.models.OrdersRecordPlate;
import com.eo.back.repositories.OrderRecordPlateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersRecordPlateService extends AbstractOrdersRecordService<OrdersRecordPlate, PendingOrderPlateDTO> {

    @Autowired
    private OrderRecordPlateRepository orderRecordPlateRepository;

    @Override
    public List<OrdersRecordPlate> getAllOrdersRecordByRestaurantId(long restaurantId) {
        return orderRecordPlateRepository.getAllOrdersRecordPlateByRestaurantId(restaurantId);
    }

    @Override
    public OrdersRecordPlate getOrdersRecordByMultiplePK(String plateName, long restaurantId) {
        return orderRecordPlateRepository.getOrdersRecordPlateByPlateNameAndRestaurantId(plateName, restaurantId);
    }

    @Override
    public void deleteOrdersRecord(long restaurantId) {
        orderRecordPlateRepository.deleteAllOrdersRecordPlateByRestaurantId(restaurantId);
    }      

    @Override
    public void saveOrderRecord(PendingOrderPlateDTO orderRecord) {

        OrdersRecordPlate ordersRecordPlate = getOrdersRecordByMultiplePK(orderRecord.getPlate().getName(), orderRecord.getRestaurantId());

        if(ordersRecordPlate != null) {
            ordersRecordPlate.setAmount(orderRecord.getAmount() + ordersRecordPlate.getAmount());
            orderRecordPlateRepository.save(ordersRecordPlate);

        } else createNewOrderRecordPlate(orderRecord);
        
    }

    private void createNewOrderRecordPlate(PendingOrderPlateDTO orderRecord) {
        OrdersRecordPlate ordersRecordPlate2 = new OrdersRecordPlate();
        ordersRecordPlate2.setAmount(orderRecord.getAmount());
        ordersRecordPlate2.setPlate(orderRecord.getPlate());
        ordersRecordPlate2.setPlateId(orderRecord.getPlateAdditionalId());
        ordersRecordPlate2.setRestaurantId(orderRecord.getRestaurantId());
        ordersRecordPlate2.setSubTotal(orderRecord.getSubTotal());
        ordersRecordPlate2.setDate(orderRecord.getDate());
        orderRecordPlateRepository.save(ordersRecordPlate2);
    }

}
