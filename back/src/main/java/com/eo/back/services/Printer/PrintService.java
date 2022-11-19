package com.eo.back.services.Printer;

import java.util.List;
import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.eo.back.dto.PrintTextDTO;
import com.eo.back.dto.pendingOrders.PendingOrderCuentaDTO;
import com.eo.back.dto.pendingOrders.PendingOrderDTO;
import com.eo.back.models.Additional;


@Service
public class PrintService {

    private static final String HEADER_FORMAT = "%-28s %5s %7s %5s";
    private static final String BODY_FORMAT = "%-30s %3s %6s %6s";

    public PrintTextDTO generateTicket(List<PendingOrderCuentaDTO> pendingOrderDtos) {
        String result = "";

        result += "------------------------------------------------\n";
        result += String.format(HEADER_FORMAT, "DESCRIPCION", "UNID.", "PRECIO", "TOTAL") + "\n";
        result += "================================================\n";

        for(PendingOrderCuentaDTO pedido : pendingOrderDtos) {
            if (Objects.nonNull(pedido.getPlate())) {
                pedido.getPlate().setName(checkStringLength(pedido.getPlate().getName()));

                result += String.format(BODY_FORMAT, pedido.getPlate().getName(), pedido.getAmount(),
                    pedido.getPlate().getPrice(), (pedido.getPlate().getPrice() * pedido.getAmount() * 100)/100) + "\n";
                
                if (pedido.getPlate().getAdditionals().size() > 0) {
                    for(Additional additional : pedido.getPlate().getAdditionals()) {
                        additional.setName(checkStringLength(additional.getName()));

                        result += String.format(BODY_FORMAT, additional.getName(), "",
                            "", additional.getPrice()) + "\n";
                    }
                }
            }

        }

        PrintTextDTO printTextDTO = new PrintTextDTO(StringUtils.stripAccents(result));
        return printTextDTO;
    }

    private String checkStringLength(String name) {
        if (name.length() > 30) {
            return name.substring(0, 30);
        }
        return name;
    }    
}
