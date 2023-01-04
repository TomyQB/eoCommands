package com.eo.back.repositories;

import com.eo.back.models.Amount;
import com.eo.back.models.Pedido;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface AmountRepository extends JpaRepository<Amount, Long> {

    @Query("select a" +
            " from amount a" +
            " where a.plate.id = :plateId" +
            " and a.order.id = :orderId")
    Amount findByOrderIdAndPlateId(@Param("orderId") final long orderId, @Param("plateId") final long plateId);

}
