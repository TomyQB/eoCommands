package com.eo.back.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "pedido")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String date;
    private double total;
    private int tableNum;

    @OneToOne
    @JoinColumn(name = "idClient")
    private UserClient userClient;

    @ManyToOne
    @JoinColumn(name = "idRestaurante")
    private Restaurant restaurant;

    @OneToMany(mappedBy = "order")
    private List<Amount> amounts;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public int getTableNum() {
        return tableNum;
    }

    public void setTableNum(int tableNum) {
        this.tableNum = tableNum;
    }

    

    public UserClient getUserClient() {
        return userClient;
    }

    public void setUserClient(UserClient userClient) {
        this.userClient = userClient;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public List<Amount> getAmounts() {
        return amounts;
    }

    public void setAmounts(List<Amount> amounts) {
        this.amounts = amounts;
    }

    
}
