package com.eo.back.repositories;

import java.util.List;

import com.eo.back.models.Image;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
    
    List<Image> findImageByIdLessThanOrderByCategory(long id);
}
