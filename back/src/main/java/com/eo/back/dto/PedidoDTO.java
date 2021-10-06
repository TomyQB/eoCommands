package com.eo.back.dto;

import java.util.List;

import com.eo.back.models.Amount;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PedidoDTO {
    
    private long id;
    private int numTable;
    private String email;
    private double total;
    private long restaurantId;
    private String date;
    private String phoneNumber;
    private String estadoFood;
    private String estadoDrink;
    private int ordersAmount;
    private int drinkCount;
    private int foodCount;
    private int hechosFood;
    private int hechosDrink;

    private List<Amount> amounts;
    
}
