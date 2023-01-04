package com.eo.back.repositories;

import com.eo.back.models.Extra;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface ExtraRepository extends JpaRepository<Extra, Long> {

    Extra findByNameAndAmountId(@Param("name") final String name, @Param("amountId") final long amountId);

}
