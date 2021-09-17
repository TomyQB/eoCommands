package com.eo.back.controllers;

import java.io.IOException;
import java.util.Map;

import com.eo.back.dto.CategoryDTO;
import com.eo.back.services.CloudinaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
public class CloudinaryController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/uploadCloudinary")
    public CategoryDTO upload(@RequestParam MultipartFile multipartFile) throws IOException {
        Map result = cloudinaryService.upload(multipartFile);
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setImage((String) result.get("url"));
        categoryDTO.setIdImage((String) result.get("public_id"));
        return categoryDTO;
    }  
    
    @PostMapping("/deleteCloudinary")
    public Map delete(@RequestParam String id) throws IOException {
        return cloudinaryService.delete(id);
    }
    
}
