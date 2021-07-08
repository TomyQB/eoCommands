package com.eo.back.dto;

public class PedidoDTO {
    
    private int numTable;
    private String email;
    private double total;
    private String restaurantName;

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
    
}
