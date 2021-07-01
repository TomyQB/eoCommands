package com.eo.back.repositories;

import java.util.List;

import com.eo.back.models.Plate;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatesRepository extends JpaRepository<Plate, Long>{

    @Query("select p from plate p where p.id_restaurant = :id")
    List<Plate>getPlatesByRestaurantId(@Param("id") long id);
    
}
