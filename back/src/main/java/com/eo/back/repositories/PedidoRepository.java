package com.eo.back.repositories;

import java.util.List;

import com.eo.back.models.Pedido;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido>deletePedidoByTableNumAndRestaurantId(int tableNum, long id);
    
    @Query("select p from pedido p where p.id_restaurant = :id")
    List<Pedido>getPedidoByRestaurantId(@Param("id") long id);

}
