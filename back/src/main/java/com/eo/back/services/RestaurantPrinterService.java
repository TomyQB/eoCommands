package com.eo.back.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eo.back.convert.Restaurant.RestaurantPrinterConverter;
import com.eo.back.dto.Restaurant.RestaurantPrinterDTO;
import com.eo.back.models.RestaurantPrinter;
import com.eo.back.repositories.RestaurantPrinterRepository;

@Service
public class RestaurantPrinterService {

    @Autowired
    private RestaurantPrinterRepository restaurantPrinterRepository;

    @Autowired
    private RestaurantPrinterConverter restaurantPrinterConverter;

    public List<RestaurantPrinter> getRestaurantPrinters(final long restaurantId) {
        return restaurantPrinterRepository.findByRestaurantId(restaurantId);
    }

    public void savePrinters(final long restaurantId, final List<RestaurantPrinterDTO> restaurantPrinterDTOs) {
        List<RestaurantPrinter> restaurantPrinters = restaurantPrinterConverter.fromDTOs(restaurantId,
                restaurantPrinterDTOs);
        restaurantPrinterRepository.saveAll(restaurantPrinters);
    }

    public void deletePrinter(final long printerId) {
        restaurantPrinterRepository.deleteById(printerId);
    }
}
