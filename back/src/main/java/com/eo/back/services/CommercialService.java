package com.eo.back.services;

import com.eo.back.dto.LoginDTO;
import com.eo.back.models.Commercial;
import com.eo.back.repositories.CommercialRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommercialService {

    @Autowired
    private CommercialRepository commercialRepository;

    public Commercial loginCommercial(LoginDTO loginDTO) {
        return commercialRepository.getCommercialByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());
    }
    
}
