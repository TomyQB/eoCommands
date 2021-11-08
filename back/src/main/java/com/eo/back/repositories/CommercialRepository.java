package com.eo.back.repositories;

import com.eo.back.models.Commercial;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommercialRepository extends JpaRepository<Commercial, Long> {
    
    Commercial getCommercialByEmailAndPassword(String email, String password);
    
}
