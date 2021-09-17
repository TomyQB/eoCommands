package com.eo.back.dto;

import java.util.List;

import com.eo.back.models.Amount;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PedidoDTO {
    
    private int numTable;
    private String email;
    private double total;
    private long restaurantId;
    private String date;
    private String phoneNumber;
    private int ordersAmount;
    private boolean haveDrink;
    private boolean haveFood;

    private List<Amount> amounts;
    
}
