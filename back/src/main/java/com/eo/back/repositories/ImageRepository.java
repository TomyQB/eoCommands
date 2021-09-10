package com.eo.back.repositories;

import com.eo.back.models.Image;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
    
}
