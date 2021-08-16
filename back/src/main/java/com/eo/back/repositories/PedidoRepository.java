package com.eo.back.repositories;

import javax.transaction.Transactional;

import com.eo.back.models.Pedido;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Transactional
    void deleteAllPedidoByRestaurantIdAndTableNum(long restaurantId, int tableNum);
}
