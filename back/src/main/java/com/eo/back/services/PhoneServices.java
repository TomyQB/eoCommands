package com.eo.back.services;

import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;


@Service
public class PhoneServices {

    public static final String ACCOUNT_SID = "ACeae276739a50378a7da90c08adccd6a6";
    public static final String AUTH_TOKEN = "603a407fbb16630cdacee449953e2707";
    // 1nZLYWheHtK1D4ZB9IjzaKBVtHYPPrqQ4jj1wxJJ

    public Integer sendSMS(String phoneNumber) {

        int verifyNumber = getVerifyNumber();

        Message message = Message.creator(new PhoneNumber("+34" + phoneNumber),
            new PhoneNumber("+14153408592"),
            "El numero de verificación para hacer el peido es: " + verifyNumber).create();

        return verifyNumber;
    }

    @PostConstruct
    private void initTwilio() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public int getVerifyNumber() {

        int randomNumber = (int) Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        return randomNumber;
    }
    
}
