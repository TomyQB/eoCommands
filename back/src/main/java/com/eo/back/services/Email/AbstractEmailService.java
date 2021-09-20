package com.eo.back.services.Email;

import org.springframework.stereotype.Service;

@Service
public abstract class AbstractEmailService<E> {

    public abstract void sendEmail(E e);
    
    public abstract String createMessage(E e);
    
}
