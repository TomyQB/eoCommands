package com.eo.back.services.OrdersRecord;

import java.util.List;

public abstract class AbstractOrdersRecordService<E, D> {

    public abstract List<E> getAllOrdersRecordByRestaurantId(long restaurantId);

    public abstract E getOrdersRecordByMultiplePK(String plateName, long restaurantId);

    public abstract void deleteOrdersRecord(long restaurantId);

    public abstract void saveOrderRecord(D orderRecord);
    
}
