package com.eo.back.controllers;

import com.eo.back.services.PhoneServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PhoneController {

    @Autowired
    private PhoneServices phoneServices;

    @PostMapping("/sms")
    public ResponseEntity<Integer> getVerifyNumberByUser(@RequestBody String phoneNumber) {
        
        int verifyNumber = phoneServices.sendSMS(phoneNumber);
        
        return new ResponseEntity<Integer>(verifyNumber, HttpStatus.OK);
    }
    
}
