package com.eo.back.controllers;

import java.util.List;

import com.eo.back.models.Image;
import com.eo.back.services.ImageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping("/getImages")
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }
    
}
