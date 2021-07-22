package com.eo.back.dto;

import java.util.List;

import com.eo.back.models.Amount;

public class PedidoDTO {
    
    private int numTable;
    private String email;
    private double total;
    private String restaurantName;
    private String date;
    private String phoneNumber;

    private List<Amount> amounts;

    public int getNumTable() {
        return numTable;
    }
    public void setNumTable(int numTable) {
        this.numTable = numTable;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public double getTotal() {
        return total;
    }
    public void setTotal(double total) {
        this.total = total;
    }
    public String getRestaurantName() {
        return restaurantName;
    }
    public void setRestaurantName(String idRestaurant) {
        this.restaurantName = idRestaurant;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public List<Amount> getAmounts() {
        return amounts;
    }
    public void setAmounts(List<Amount> amounts) {
        this.amounts = amounts;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
}
