package com.eo.back.services;

import com.eo.back.models.Amount;
import com.eo.back.repositories.AmountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AmountServices {

    @Autowired
    private AmountRepository repository;

    public void saveAmount(Amount amount) {
        repository.save(amount);
    }
    
}
