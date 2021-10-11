package com.eo.back.dto;

import lombok.Data;

@Data
public class WhatsAppDTO {

    private long restaurantId;
    private String restaurantName;
    private int tableNum;
    private String phone;
    
}
