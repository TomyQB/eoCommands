package com.eo.back.controllers;

import java.util.List;
import java.io.IOException;
import java.util.Map;

import com.eo.back.convert.CategoryConverter;
import com.eo.back.convert.PedidoConverter;
import com.eo.back.dto.CategoryDTO;
import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Category;
import com.eo.back.models.Pedido;
import com.eo.back.services.CategoryServices;
import com.eo.back.services.CloudinaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryServices categoryServices;
    
    @Autowired
    private CategoryConverter categoryConverter;
    
    @Autowired
    private CloudinaryService cloudinaryService;
    
    @Autowired
    private PedidoConverter pedidoConverter;

    @MessageMapping("/save")
    @SendTo("/admin")
    public Pedido sendMessage(PedidoDTO pedido) {
        System.out.println(pedido);
        return pedidoConverter.fromDTO(pedido);
    }


    @GetMapping("/menu/{restaurantName}")
    public ResponseEntity<List<Category>> getCategories(@PathVariable String restaurantName){
        List<Category> categoriesList = categoryServices.getAllCategories(restaurantName);
        return new ResponseEntity<List<Category>>(categoriesList, HttpStatus.OK);
    }

    @PostMapping("/createCategory")
    public void createCategory(@RequestBody CategoryDTO categoryDTO) {
        Category category = categoryConverter.fromDTO(categoryDTO);
        categoryServices.saveCategory(category);
    }

    @PostMapping("/deleteCategory")
    public void deleteCategory(@RequestBody CategoryDTO categoryDTO) throws IOException {
        categoryServices.deleteCategory(categoryDTO.getId());
        if(!categoryDTO.getIdImage().equals("")) cloudinaryService.delete(categoryDTO.getIdImage());
    }
    
}
