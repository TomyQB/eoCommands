package com.eo.back.convert;

import org.springframework.stereotype.Service;

@Service
public abstract class AbstractConverter<E,D> {
    
    public abstract E fromDTO(D dto);
}
