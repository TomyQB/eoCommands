package com.eo.back.dto;

public class PedidoDTO {
    
    private int numTable;
    private String email;
    private double total;
    private int idRestaurant;

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
    public int getIdRestaurant() {
        return idRestaurant;
    }
    public void setIdRestaurant(int idRestaurant) {
        this.idRestaurant = idRestaurant;
    }
    
}
