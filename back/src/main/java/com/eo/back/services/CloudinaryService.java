package com.eo.back.services;

import javax.annotation.PostConstruct;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CloudinaryService {

    @Autowired
    private RestaurantServices restaurantServices;
    
    Cloudinary cloudinary;

    private Map<String, String> valuesMap = new HashMap<>();

    @PostConstruct
    public void initCloudinary() {
        valuesMap.put("cloud_name", "dxxvcl5fe");
        valuesMap.put("api_key", "686258587687993");
        valuesMap.put("api_secret", "x3pUHMTRDKK9ZX9jR4vUiMXvAp4");
        cloudinary = new Cloudinary(valuesMap);
    }

    public Map upload(MultipartFile multipartFile) throws IOException {
        File file = convert(multipartFile);
        Map result = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
        file.delete();
        return result;
    }

    public Map delete(String id) throws IOException {
        Map result = cloudinary.uploader().destroy((id), ObjectUtils.emptyMap());
        return result;
    }

    private File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        FileOutputStream fo = new FileOutputStream(file);
        fo.write(multipartFile.getBytes());
        fo.close();
        return file;
    }

    public void deleteImageByRestaurantId(long id) throws IOException {
        if(restaurantServices.getRestaurantById(id).getIdImage() != null)
        delete(restaurantServices.getRestaurantById(id).getIdImage());
    }

}
