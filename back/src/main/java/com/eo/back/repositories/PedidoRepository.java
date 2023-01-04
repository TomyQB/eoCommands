package com.eo.back.repositories;

import java.util.List;

import javax.transaction.Transactional;

import com.eo.back.models.Pedido;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> getAllPedidoByRestaurantIdAndTableNum(long restaurantId, int tableNum);

    @Transactional
    List<Pedido> deleteAllPedidoByRestaurantIdAndTableNum(long restaurantId, int tableNum);
}
