package com.eo.back.repositories;

import com.eo.back.models.Amount;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AmountRepository extends JpaRepository<Amount, Long> {

    Amount findByPlateIdAndOrderId(final long plateId, final long orderId);

}
