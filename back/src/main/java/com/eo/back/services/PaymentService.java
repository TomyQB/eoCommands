package com.eo.back.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.eo.back.dto.PaymentIntentDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Transfer;

import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    
    String secretKey = "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";

    public PaymentIntent paymentIntent(PaymentIntentDTO paymentIntentDTO) throws StripeException {

        Stripe.apiKey = secretKey;
        
        List<String> paymentMethodTypes = new ArrayList<String>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentIntentDTO.getPrice());
        params.put("currency", paymentIntentDTO.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);
        params.put("receipt_email", "montiaalvo@gmail.com");
        params.put("payment_method", "pm_card_visa");
        
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        paymentIntent = paymentIntent.confirm();
        // paymentIntent = confirmPayment(paymentIntent.getId());

        return paymentIntent;
    }

    public PaymentIntent confirmPayment(String id) throws StripeException {
        
        PaymentIntent paymentIntent = PaymentIntent.retrieve(id);

        Map<String, Object> params = new HashMap<>();
        params.put("payment_method", "pm_card_visa");

        return paymentIntent.confirm();

        // return paymentIntent;
    }
    // sk_test_51HZwJtDRmiSLFsD4iKnp5v9sEHr0717egWnNVA5SdTlCuSYl7C13OhjTYsdItN47yMgANq0wTWDmdSF7y8EtYfOb00ux02SalP
    public void transferPayment(String idUserConnected, String currency, long amount) throws StripeException {
        Stripe.apiKey = "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";
        
        System.out.println("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
        System.out.println(idUserConnected);
        System.out.println(currency);
        System.out.println(amount);
        
        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);
        params.put("currency", currency);
        params.put("destination", idUserConnected);

        Transfer transfer = Transfer.create(params);
        
        System.out.println(transfer);
    }

    public PaymentIntent cancelPayment(String id) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(id);

        paymentIntent.cancel();

        return paymentIntent;
    }
}
