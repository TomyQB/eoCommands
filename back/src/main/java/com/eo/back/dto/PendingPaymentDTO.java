package com.eo.back.dto;

import com.eo.back.models.UserRestaurant;

public class PendingPaymentDTO {
    private String date;
    private long amount;
    private String nameUserRestaurant;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public String getNameUserRestaurant() {
        return nameUserRestaurant;
    }

    public void setNameUserRestaurant(String nameUserRestaurant) {
        this.nameUserRestaurant = nameUserRestaurant;
    }
    
}
