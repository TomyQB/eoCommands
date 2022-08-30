package com.eo.back.webSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.eo.back.controllers.CategoryController;

@Component
@EnableScheduling
public class Cron {
    
    @Autowired
    private CategoryController categoryController;

    private static final long MINUTE = 1000 * 60;

    
    /*@Scheduled(fixedDelay = 5000)
    public void saveIntoHistory() {
        System.out.println("cron");
        categoryController.sendMessage("se está enviando información");
    }*/
}
