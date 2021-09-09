package com.eo.back.repositories;

import com.eo.back.models.Plate;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlateRepository extends JpaRepository<Plate, Long> {
    
}
