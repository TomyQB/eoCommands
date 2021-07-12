package com.eo.back.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.eo.back.dto.PaymentIntentDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    
    String secretKey = "sk_test_51HZwJtDRmiSLFsD4iKnp5v9sEHr0717egWnNVA5SdTlCuSYl7C13OhjTYsdItN47yMgANq0wTWDmdSF7y8EtYfOb00ux02SalP";

    public PaymentIntent paymentIntent(PaymentIntentDTO paymentIntentDTO) throws StripeException {
        Stripe.apiKey = secretKey;
        
        List<String> paymentMethodTypes = new ArrayList<String>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentIntentDTO.getPrice());
        params.put("currency", paymentIntentDTO.getCurrency());
        // params.put("description", paymentIntentDTO.getDescription());
        params.put("payment_method_types", paymentMethodTypes);
        params.put("payment_method", "pm_card_visa");
        
        System.out.println("BBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        paymentIntent = paymentIntent.confirm();
        // paymentIntent = confirmPayment(paymentIntent.getId());

        return paymentIntent;
    }

    public PaymentIntent confirmPayment(String id) throws StripeException {
        
        System.out.println("CCCCCCCCCCCCCCCCCCCCCCCC");
        PaymentIntent paymentIntent = PaymentIntent.retrieve(id);

        Map<String, Object> params = new HashMap<>();
        params.put("payment_method", "pm_card_visa");

        return paymentIntent.confirm();

        // return paymentIntent;
    }

    public PaymentIntent cancelPayment(String id) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(id);

        paymentIntent.cancel();

        return paymentIntent;
    }
}
