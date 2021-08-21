package com.eo.back.controllers;

import com.eo.back.services.Email.CodeEmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class EmailController {

    @Autowired
    private CodeEmailService codeEmailService;

    @PostMapping("/code")
    public ResponseEntity<Integer> getVerifyEmail(@RequestBody String email) {
        
        int verifyNumber = Integer.parseInt(codeEmailService.sendEmail(email));
        
        return new ResponseEntity<>(verifyNumber, HttpStatus.OK);
    }
    
}
