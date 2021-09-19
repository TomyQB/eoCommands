package com.eo.back.services;

import com.eo.back.models.Additional;
import com.eo.back.repositories.AdditionalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdditionalService {

    @Autowired
    private AdditionalRepository additionalRepository;

    public void saveAdditional(Additional additional) {
        additionalRepository.save(additional);
    }

    public void deleteAdditional(long id) {
        additionalRepository.deleteById(id);
    }
    
}
