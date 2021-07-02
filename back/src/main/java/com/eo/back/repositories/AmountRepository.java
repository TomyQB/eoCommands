package com.eo.back.repositories;

import com.eo.back.models.Amount;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmountRepository extends JpaRepository<Amount, Long> {
    
}
