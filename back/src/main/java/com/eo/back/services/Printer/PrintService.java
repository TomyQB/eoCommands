package com.eo.back.services.Printer;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eo.back.dto.pendingOrders.PendingOrderDTO;

@Service
public class PrintService {

    public String generateTicket(List<PendingOrderDTO> pendingOrderDtos) {
        String result = "";

        result += "------------------------------------------------\n";
        result += String.format("%10s %20s %5s %5s", "DESCRIPCION", "UNID.", "PRECIO", "TOTAL") + "\n";
        result += "================================================\n";

        return result;
    }
    
}
