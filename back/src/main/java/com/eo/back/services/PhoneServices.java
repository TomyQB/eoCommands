package com.eo.back.services;

import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;


@Service
public class PhoneServices {

    public static final String ACCOUNT_SID = "AC529113d9fc7b3f80c6612180960dae28";
    public static final String AUTH_TOKEN = "5cf4366b3811af8573ca5ce84d06eddc";
    // 15174892996

    public Integer sendSMS(String phoneNumber) {

        int verifyNumber = getVerifyNumber();

        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message message = Message.creator(new PhoneNumber("+34" + phoneNumber),
            new PhoneNumber("+15174892996"),
            "El numero de verificación para hacer el peido es: " + verifyNumber).create();
    
        System.out.println(message.getSid());
        return verifyNumber;
    }

    public int getVerifyNumber() {

        int randomNumber = (int) Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        return randomNumber;
    }
    
}
