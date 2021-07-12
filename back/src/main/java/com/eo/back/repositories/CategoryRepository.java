package com.eo.back.repositories;

import java.util.List;

import com.eo.back.models.Category;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("select c from category c where c.id_restaurant = :name orderby c.name")
    List<Category>getCategoryByRestaurantName(@Param("name") String name);
    
}
