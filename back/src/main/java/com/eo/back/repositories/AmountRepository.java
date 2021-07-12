package com.eo.back.repositories;

import java.util.List;

import com.eo.back.models.Amount;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface AmountRepository extends JpaRepository<Amount, Long> {

    Amount getAmountByOrderId(long id);
    Long deleteByOrderId(long id);
    Long deleteAmountById(long id);

    // @Query("delete a from amount a where a.id_order = :id")
    // List<Amount>deleteByOrderId(@Param("id") long id);

}
