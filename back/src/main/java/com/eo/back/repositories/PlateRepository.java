package com.eo.back.repositories;

import java.util.List;

import javax.transaction.Transactional;

import com.eo.back.models.Plate;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlateRepository extends JpaRepository<Plate, Long> {

    @Query("select p from plate p where p.id_category = :id")
    List<Plate> getPlatesByCategoryId(long id);
}
