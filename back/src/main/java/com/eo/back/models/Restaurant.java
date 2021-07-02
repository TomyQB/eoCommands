package com.eo.back.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "restaurant")
public class Restaurant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToOne
    @JoinColumn(name = "idUserrestaurant")
    private UserRestaurant userRestaurant;

    @OneToMany(mappedBy = "restaurant")
    private List<Category> categories;

    @OneToMany(mappedBy = "restaurant")
    private List<Pedido> orders;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserRestaurant getUserRestaurant() {
        return userRestaurant;
    }

    public void setUserRestaurant(UserRestaurant userRestaurant) {
        this.userRestaurant = userRestaurant;
    }

    
    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<Pedido> getOrders() {
        return orders;
    }

    public void setOrders(List<Pedido> orders) {
        this.orders = orders;
    }

    @Override
    public String toString() {
        return "Restaurant [id=" + id + "]";
    }

    

        
}
