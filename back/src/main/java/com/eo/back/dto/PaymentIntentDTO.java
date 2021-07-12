package com.eo.back.dto;

public class PaymentIntentDTO {

    public enum Currency {
        EUR;
    }
    
    private String description;
    private int price;
    private Currency currency;

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public int getPrice() {
        return price;
    }
    public void setPrice(int price) {
        this.price = price;
    }

    public Currency getCurrency() {
        return currency;
    }
    public void setCurrency(Currency currency) {
        this.currency = currency;
    }
    @Override
    public String toString() {
        return "PaymentIntentDTO [currency=" + currency + ", description=" + description + ", price=" + price + "]";
    }

        
}
