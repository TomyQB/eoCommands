package com.eo.back.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Entity
@IdClass(PendingPaymentId.class)
@Table(name = "pendingpayment")
public class PendingPayment {

    @Id
    private String date;

    @Id
    private long secondPK;
    
    private long amount;

    @ManyToOne(optional = false)
    @JoinColumn(name = "idUserRestaurant")
    @JsonIgnore
    private UserRestaurant userRestaurant;

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

    public UserRestaurant getUserRestaurant() {
        return userRestaurant;
    }

    public void setUserRestaurant(UserRestaurant userRestaurant) {
        this.userRestaurant = userRestaurant;
    }

    public long getSecondPK() {
        return secondPK;
    }

    public void setSecondPK(long secondPK) {
        this.secondPK = secondPK;
    }

    @Override
    public String toString() {
        return "PendingPayment [amount=" + amount + ", date=" + date + "]";
    }
     
    
}
