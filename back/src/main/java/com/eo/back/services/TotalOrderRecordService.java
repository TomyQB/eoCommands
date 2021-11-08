package com.eo.back.services;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.eo.back.models.Month;
import com.eo.back.models.TotalOrdersRecord;
import com.eo.back.repositories.RestaurantRepository;
import com.eo.back.repositories.TotalOrderRecordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TotalOrderRecordService {
    
    @Autowired
    private TotalOrderRecordRepository totalOrderRecordRepository;

    @Autowired
    private RestaurantServices restaurantServices;

    public List<TotalOrdersRecord> getAllTotalOrdersRecord(long restaurantId) {
        return totalOrderRecordRepository.getTotalOrdersRecordByRestaurantId(restaurantId);
    }

    private TotalOrdersRecord getTotalOrdersRecordByMultiplePK(String month, String year, long restaurantId) {
        return totalOrderRecordRepository.getTotalOrdersRecordByMonthAndYearAndRestaurantId(month, year, restaurantId);
    }

    public void updateTotalOrdersRecord(long restaurantId) {
        TotalOrdersRecord totalOrdersRecord = getTotalOrdersRecordByMultiplePK(getMonth(), getYear(), restaurantId);

        if(totalOrdersRecord != null) {
            totalOrdersRecord.setAmountOrders(totalOrdersRecord.getAmountOrders() + 1);
            totalOrderRecordRepository.save(totalOrdersRecord);
        } else createNewTotalOrdersRecord(restaurantId);
    }

    private void createNewTotalOrdersRecord(long restaurantId) {
        TotalOrdersRecord totalOrdersRecord = new TotalOrdersRecord();

        totalOrdersRecord.setAmountOrders(1);
        totalOrdersRecord.setRestaurantId(restaurantId);
        totalOrdersRecord.setMonth(getMonth());
        totalOrdersRecord.setYear(getYear());
        totalOrdersRecord.setRestaurant(restaurantServices.getRestaurantById(restaurantId));

        totalOrderRecordRepository.save(totalOrdersRecord);
    }
    
    private String getMonth() {
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int month = localDate.getMonthValue();
        return Month.intToMonth(month);
    }
        
    private String getYear() {
        Date date = new Date();
        SimpleDateFormat getYearFormat = new SimpleDateFormat("yyyy");
        String currentYear = getYearFormat.format(date);
        return currentYear;
    }
}
