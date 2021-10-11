package com.eo.back.controllers;

import java.util.List;

import com.eo.back.models.TotalOrdersRecord;
import com.eo.back.services.TotalOrderRecordService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class TotalOrderRecordController {
    
    @Autowired
    private TotalOrderRecordService totalOrderRecordService;

    @PostMapping("/getTotalOrdersRecord")
    public List<TotalOrdersRecord> getTotalOrdersRecord(@RequestBody long restaurantId){
        return totalOrderRecordService.getAllTotalOrdersRecord(restaurantId);
    }
    
    @PostMapping("/updateTotalOrdersRecord")
    public List<TotalOrdersRecord> updateTotalOrdersRecord(@RequestBody long restaurantId){
        totalOrderRecordService.updateTotalOrdersRecord(restaurantId);
        return totalOrderRecordService.getAllTotalOrdersRecord(restaurantId);
    }
}
