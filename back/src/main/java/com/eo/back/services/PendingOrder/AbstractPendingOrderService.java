package com.eo.back.services.PendingOrder;

import java.util.List;

import com.eo.back.dto.PedidoDTO;

public abstract class AbstractPendingOrderService<T> {

    public abstract List<T> getPendingOrderByRestaurantId(long restaurantId);

    public abstract List<T> getPendingOrderByRestaurantIdAndTableNum(long restaurantId, int tableNum);

    public abstract List<T> deletePendingOrder(long restaurantId, int tableNum);

    public abstract T getPendingOrderByMultiplePK(String plateName, long restaurantId, int tableNum);

    public abstract void savePendingOrder(PedidoDTO dto);
    
}
