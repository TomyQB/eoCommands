package com.eo.back.services;

import java.util.ArrayList;
import java.util.List;

import com.eo.back.models.Amount;

import org.springframework.stereotype.Service;

@Service
public class AmountServices {

    private List<Amount> amounts = new ArrayList<Amount>();

    public List<Amount> getAmountList() {
        return this.amounts;
    }
    
    public void addAmountToList(Amount amount) {
        if(amounts.size() > 0) {
            if(!comprobateAmountExist(amount)) {
                amounts.add(amount);
            }
        } else {
            amounts.add(amount);
        }
    }

    private boolean comprobateAmountExist(Amount amount) {
        boolean exist = false;
        Amount repeAmount = new Amount();

        for (Amount a : amounts) {
            if(a.getPlate().getName().equals(amount.getPlate().getName())) {
                repeAmount = a; 
                exist = true;
            }
        }

        if(exist && amount.getAmount() > 0) {
            amounts.remove(repeAmount);
            amounts.add(amount);
        } else if(exist && amount.getAmount() == 0) {
            amounts.remove(repeAmount);
        }
        
        return exist;
    }

}
