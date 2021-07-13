package com.eo.back.controllers;

import com.eo.back.dto.PaymentIntentDTO;
import com.eo.back.services.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/payment")
    public ResponseEntity<Boolean> payment(@RequestBody PaymentIntentDTO paymentIntentDTO) throws StripeException {
        System.out.println("AAAAAAAAAAAAAAAAAAAAAA");
        System.out.println(paymentIntentDTO.toString());

        Boolean succeeded = false;

        PaymentIntent paymentIntent = paymentService.paymentIntent(paymentIntentDTO);
        String paymentStr = paymentIntent.toJson();
        if(paymentStr.indexOf("succeeded") != -1) {
            succeeded = true;
            paymentService.transferPayment("acct_1JCnGqJ4Ehs7B0OC", paymentIntent.getCurrency(), paymentIntent.getAmount());
        }
        System.out.println(paymentStr);

        return new ResponseEntity<Boolean>(succeeded, HttpStatus.OK);
    }

    // @PostMapping("/confirm/{id}")
    // public ResponseEntity<String> confirm(@PathVariable("id") String id) throws StripeException {
    //     PaymentIntent paymentIntent = paymentService.confirmPayment(id);
    //     String paymentStr = paymentIntent.toJson();

    //     return new ResponseEntity<String>(paymentStr, HttpStatus.OK);
    // }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<String> cancel(@PathVariable("id") String id) throws StripeException {
        PaymentIntent paymentIntent = paymentService.cancelPayment(id);
        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<String>(paymentStr, HttpStatus.OK);
    }
}
