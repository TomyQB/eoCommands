package com.eo.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eo.back.models.Restaurant;

@Service
public class SecurityService {
    // 37.984099034756646, -1.1292980926008793

    // 37.98386068251205, -1.1292857636271671

    // 37.98409374958718, -1.1295663134841192

    @Autowired
    private RestaurantServices restaurantServices;

    public boolean checkGeolocation(final long restaurantId, final double latitude, final double longitude) {
        Restaurant restaurant = restaurantServices.getRestaurantById(restaurantId);
        return isInLatitude(latitude, restaurant.getLatitude()) && isInLongitude(longitude, restaurant.getLongitude());
    }

    // Latitud marca norte o sur
    public boolean isInLatitude(final double myLatitude, final String restaurantLatitude) {
        if (myLatitude < Double.parseDouble(restaurantLatitude) + 0.000005
                && myLatitude > Double.parseDouble(restaurantLatitude) - 0.000005)
            return true;
        return false;
    }

    // Latitud marca este u oeste
    public boolean isInLongitude(final double myLongitude, final String restaurantLongitude) {
        if (myLongitude < Double.parseDouble(restaurantLongitude) + 0.000015
                && myLongitude > Double.parseDouble(restaurantLongitude) - 0.000015)
            return true;
        return false;
    }
}
