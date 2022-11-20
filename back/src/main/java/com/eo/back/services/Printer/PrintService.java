package com.eo.back.services.Printer;

import java.util.List;
import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eo.back.dto.PrintTextDTO;
import com.eo.back.dto.pendingOrders.PendingOrderCuentaDTO;
import com.eo.back.models.Additional;
import com.eo.back.models.Amount;
import com.eo.back.models.Pedido;
import com.eo.back.services.RestaurantServices;


@Service
public class PrintService {

    @Autowired
    private RestaurantServices restaurantServices;

    private static final int MAX_WIDTH = 46;
    private static final int MAX_DESCRIPTION_WIDTH_CUENTA = 30;
    private static final int MAX_DESCRIPTION_WIDTH_COMIDA = 40;
    private static final String CUENTA_HEADER_FORMAT = "%-28s %5s %7s %5s";
    private static final String CUENTA_BODY_FORMAT = "%-30s %-3s %6s %6s";
    private static final String FOOD_DRINK_FORMAT = "%-4s %-41s";

    public PrintTextDTO generateTicketCuenta(List<PendingOrderCuentaDTO> pendingOrderDtos) {
        String result = "";

        String restaurantName = restaurantServices.getRestaurantById(pendingOrderDtos.get(0).getRestaurantId()).getName();
        String headerRestaurant = "RESTAURANTE " + restaurantName;
        String headerTable = "MESA " + pendingOrderDtos.get(0).getTableNum();

        result += centerString(headerRestaurant) + "\n\n";
        result += centerString(headerTable) + "\n\n";

        result += "------------------------------------------------\n";
        result += String.format(CUENTA_HEADER_FORMAT, "DESCRIPCION", "UNID.", "PRECIO", "TOTAL") + "\n";
        result += "================================================\n";

        for(PendingOrderCuentaDTO pedido : pendingOrderDtos) {
            if (Objects.nonNull(pedido.getPlate())) {
                pedido.getPlate().setName(checkStringLength(pedido.getPlate().getName(), MAX_DESCRIPTION_WIDTH_CUENTA));

                result += String.format(CUENTA_BODY_FORMAT, pedido.getPlate().getName(), pedido.getAmount(),
                    pedido.getPlate().getPrice(), (pedido.getPlate().getPrice() * pedido.getAmount() * 100)/100) + "\n";
                
                if (pedido.getPlate().getAdditionals().size() > 0) {
                    for(Additional additional : pedido.getPlate().getAdditionals()) {
                        additional.setName(checkStringLength(additional.getName(), MAX_DESCRIPTION_WIDTH_CUENTA));

                        result += String.format(CUENTA_BODY_FORMAT, additional.getName(), "",
                            "", additional.getPrice()) + "\n";
                    }
                }
            }

        }

        PrintTextDTO printTextDTO = new PrintTextDTO(StringUtils.stripAccents(result));
        return printTextDTO;
    }

    public PrintTextDTO generateTicketFood(Pedido pedido) {
        String result = "";

        String headerTable = "MESA " + pedido.getTableNum();
        result += centerString(headerTable) + "\n\n";

        result += String.format(FOOD_DRINK_FORMAT, "CANT", "PRODUCTO") + "\n";

        for(Amount dish : pedido.getAmounts()) {
            if (!dish.getPlate().isDrink()) {
                result += String.format(FOOD_DRINK_FORMAT, dish.getAmount(), dish.getPlate().getName()) + "\n";
                
                if (Objects.nonNull(dish.getDescription())) {
                    result += String.format(FOOD_DRINK_FORMAT,"", dish.getDescription()) + "\n";
                }
            }
        }

        PrintTextDTO printTextDTO = new PrintTextDTO(StringUtils.stripAccents(result));
        return printTextDTO;
    }
    
    public PrintTextDTO generateTicketDrink(Pedido pedido) {
        String result = "";

        String headerTable = "MESA " + pedido.getTableNum();
        result += centerString(headerTable) + "\n\n";

        result += String.format(FOOD_DRINK_FORMAT, "CANT", "PRODUCTO") + "\n\n";

        for(Amount dish : pedido.getAmounts()) {
            if (dish.getPlate().isDrink()) {
                result += String.format(FOOD_DRINK_FORMAT, dish.getAmount(), dish.getPlate().getName()) + "\n";
                
                if (Objects.nonNull(dish.getDescription())) {
                    result += String.format(FOOD_DRINK_FORMAT,"", dish.getDescription()) + "\n";
                }
            }
        }

        PrintTextDTO printTextDTO = new PrintTextDTO(StringUtils.stripAccents(result));
        return printTextDTO;
    }

    private String centerString(final String text) {
        int center = (MAX_WIDTH / 2) + (text.length() / 2);
        return String.format("%" + center + "s %" + (MAX_WIDTH - center) + "s", text, "");
    }

    private String checkStringLength(String name, final int maxLength) {
        if (name.length() > maxLength) {
            return name.substring(0, maxLength);
        }
        return name;
    }    
}
