package com.eo.back.convert.Restaurant;

import com.eo.back.convert.AbstractConverter;
import com.eo.back.dto.Restaurant.RestaurantPrinterDTO;
import com.eo.back.models.RestaurantPrinter;
import com.eo.back.services.RestaurantServices;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantPrinterConverter extends AbstractConverter<RestaurantPrinter, RestaurantPrinterDTO> {
    
    @Autowired
    private RestaurantServices restaurantServices;

    @Override
    public RestaurantPrinter fromDTO(RestaurantPrinterDTO dto) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public RestaurantPrinterDTO toDTO(RestaurantPrinter entity) {
        // TODO Auto-generated method stub
        return null;
    }

    public List<RestaurantPrinter> fromDTOs(final long restaurantId, final List<RestaurantPrinterDTO> dto) {
        List<RestaurantPrinter> restaurantPrinters = new ArrayList<>();

        for(RestaurantPrinterDTO restaurantPrinterDTO : dto) {
            RestaurantPrinter restaurantPrinter = new RestaurantPrinter();
            restaurantPrinter.setName(restaurantPrinterDTO.getName());
            restaurantPrinter.setType(restaurantPrinterDTO.getType());
            restaurantPrinter.setRestaurant(restaurantServices.getRestaurantById(restaurantId));
            restaurantPrinters.add(restaurantPrinter);
        }

        return restaurantPrinters;
    }

    public List<RestaurantPrinterDTO> toDTOs(List<RestaurantPrinter> entity) {
        // TODO Auto-generated method stub
        return null;
    }

    
}
