package com.eo.back.services.Printer;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eo.back.dto.CancelFoodPrintDTO;
import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.PrintTextDTO;
import com.eo.back.dto.pendingOrders.PendingOrderCuentaDTO;
import com.eo.back.models.Additional;
import com.eo.back.models.Amount;
import com.eo.back.models.Extra;
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

    public PrintTextDTO generateTicketCuenta(List<PedidoDTO> pedidos) {
        String result = "";

        String restaurantName = restaurantServices.getRestaurantById(pedidos.get(0).getRestaurantId()).getName();
        String headerRestaurant = "RESTAURANTE " + restaurantName;
        String headerTable = "MESA " + pedidos.get(0).getNumTable();

        result += centerString(headerRestaurant) + "\n\n";
        result += centerString(headerTable) + "\n\n";

        result += "------------------------------------------------\n";
        result += String.format(CUENTA_HEADER_FORMAT, "DESCRIPCION", "UNID.", "PRECIO", "TOTAL") + "\n";
        result += "================================================\n";

        for (PedidoDTO pedido : pedidos) {
            for (Amount amount : pedido.getAmounts()) {
                if (Objects.nonNull(amount.getPlate())) {
                    amount.getPlate()
                            .setName(checkStringLength(amount.getPlate().getName(), MAX_DESCRIPTION_WIDTH_CUENTA));

                    result += String.format(CUENTA_BODY_FORMAT, amount.getPlate().getName(), amount.getAmount(),
                            amount.getPlate().getPrice(),
                            (amount.getPlate().getPrice() * amount.getAmount() * 100) / 100) + "\n";

                    if (amount.getExtras().size() > 0) {
                        for (Extra extra : amount.getExtras()) {
                            extra.setName(checkStringLength(extra.getName(), MAX_DESCRIPTION_WIDTH_CUENTA));

                            result += String.format(CUENTA_BODY_FORMAT, extra.getName(), "",
                                    "", extra.getPrice()) + "\n";
                        }
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

        List<Amount> entrantes = pedido.getAmounts().stream().filter(amount -> "2".equals(amount.getType()))
                .collect(Collectors.toList());
        if (!entrantes.isEmpty()) {
            result += centerString("--- ENTRANTES ---") + "\n";
            result = printAmounts(entrantes, result);
        }

        List<Amount> principales = pedido.getAmounts().stream().filter(amount -> "3".equals(amount.getType()))
                .collect(Collectors.toList());
        if (!principales.isEmpty()) {
            result += "\n";
            result += centerString("--- PRINCIPALES ---") + "\n";
            result = printAmounts(principales, result);
        }

        // for (Amount dish : pedido.getAmounts()) {
        // if (!dish.getPlate().isDrink()) {
        // result += String.format(FOOD_DRINK_FORMAT, dish.getAmount(),
        // dish.getPlate().getName()) + "\n";

        // result += addExtras(dish);
        // result += addDescription(dish);
        // }
        // }

        PrintTextDTO printTextDTO = new PrintTextDTO(StringUtils.stripAccents(result));
        return printTextDTO;
    }

    private String printAmounts(List<Amount> amounts, String result) {
        for (Amount dish : amounts) {
            if (!dish.getPlate().isDrink()) {
                result += String.format(FOOD_DRINK_FORMAT, dish.getAmount(), dish.getPlate().getName()) + "\n";

                result += addExtras(dish);
                result += addDescription(dish);
            }
        }
        return result;
    }

    public PrintTextDTO generateTicketDrink(Pedido pedido) {
        String result = "";

        String headerTable = "MESA " + pedido.getTableNum();
        result += centerString(headerTable) + "\n\n";

        result += String.format(FOOD_DRINK_FORMAT, "CANT", "PRODUCTO") + "\n";

        for (Amount dish : pedido.getAmounts()) {
            if (dish.getPlate().isDrink()) {
                result += String.format(FOOD_DRINK_FORMAT, dish.getAmount(), dish.getPlate().getName()) + "\n";

                String extrasRes = addExtras(dish);
                String descriptionRes = addDescription(dish);

                if (!"".equals(extrasRes))
                    result += addExtras(dish);
                if (!"".equals(descriptionRes))
                    result += addDescription(dish);
            }
        }

        PrintTextDTO printTextDTO = new PrintTextDTO(StringUtils.stripAccents(result));
        return printTextDTO;
    }

    public PrintTextDTO generateTicketCancelFood(CancelFoodPrintDTO pedido) {
        String result = "";

        String headerTable = "MESA " + pedido.getTableNum() + " CANCELACION";
        result += centerString(headerTable) + "\n\n";

        result += String.format(FOOD_DRINK_FORMAT, "CANT", "PRODUCTO") + "\n";
        result += String.format(FOOD_DRINK_FORMAT, pedido.getAmount(), pedido.getName()) + "\n";

        PrintTextDTO printTextDTO = new PrintTextDTO(StringUtils.stripAccents(result));
        return printTextDTO;
    }

    public PrintTextDTO generateTicketCancelDrink(Pedido pedido) {
        String result = "";

        String headerTable = "MESA " + pedido.getTableNum();
        result += centerString(headerTable) + "\n\n";

        result += String.format(FOOD_DRINK_FORMAT, "CANT", "PRODUCTO") + "\n\n";

        for (Amount dish : pedido.getAmounts()) {
            if (dish.getPlate().isDrink()) {
                result += String.format(FOOD_DRINK_FORMAT, dish.getAmount(), dish.getPlate().getName()) + "\n";

                result += addDescription(dish);
            }
        }

        PrintTextDTO printTextDTO = new PrintTextDTO(StringUtils.stripAccents(result));
        return printTextDTO;
    }

    private String centerString(final String text) {
        int center = (MAX_WIDTH / 2) + (text.length() / 2);
        return String.format("%" + (MAX_WIDTH - center) + "s %" + text.length() + "s %" + (MAX_WIDTH - center) + "s",
                "", text, "");
    }

    private String checkStringLength(String name, final int maxLength) {
        if (name.length() > maxLength) {
            return name.substring(0, maxLength);
        }
        return name;
    }

    private String addExtras(final Amount dish) {
        String result = "";
        if (Objects.nonNull(dish.getExtras())) {
            for (Extra extra : dish.getExtras())
                result += String.format(FOOD_DRINK_FORMAT, "", extra.getName()) + "\n";
        }
        return result;
    }

    private String addDescription(final Amount dish) {
        String result = "";
        if (Objects.nonNull(dish.getDescription())) {
            result += String.format(FOOD_DRINK_FORMAT, "", dish.getDescription()) + "\n";
        }
        return result;
    }
}
