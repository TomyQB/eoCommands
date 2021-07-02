package com.eo.back.controllers;

import java.util.ArrayList;
import java.util.List;

import com.eo.back.convert.PedidoConverter;
import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.Category;
import com.eo.back.models.Pedido;
import com.eo.back.models.Plate;
import com.eo.back.models.Restaurant;
import com.eo.back.services.PedidoServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {

    @Autowired
    private PedidoConverter converter;

    @Autowired
    private PedidoServices services;

    @PostMapping("/converter")
    public void pedidoRecived(@RequestBody PedidoDTO dto) {

        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

        Restaurant r = new Restaurant();
        r.setId(1);
        
        Plate plate1 = new Plate();

        Amount amount1 = new Amount();
        amount1.setAmount(3);
        amount1.setDescription("Muy muy fria");
        // amount1.setPlate(plate1);

        Category category1 = new Category();
        category1.setImage("image1.jpg");
        category1.setName("Bebida");
        category1.setRestaurant(r);

        plate1.setAdditionals(null);
        plate1.setAmount(amount1);
        // plate1.setCategory(category1);
        plate1.setDescription("Litro");
        plate1.setName("Estrella de levante");
        plate1.setPrice(3);

        Plate plate2 = new Plate();

        Amount amount2 = new Amount();
        amount2.setAmount(2);
        amount2.setDescription("Sin lechuga");
        // amount2.setPlate(plate2);

        Category category2 = new Category();
        category2.setImage("image2.jpg");
        category2.setName("Carne");

        plate2.setAdditionals(null);
        plate2.setAmount(amount2);
        // plate2.setCategory(category2);
        plate2.setDescription("Rico papi");
        plate2.setName("Costillar");
        plate2.setPrice(20);

        List<Plate> plates = new ArrayList<Plate>();
        plates.add(plate1);
        plates.add(plate2);

        PedidoDTO dto2 = new PedidoDTO();
        dto2.setEmail("email@gmail.com");
        dto2.setTableNum(22);
        dto2.setPlates(plates);
        dto2.setRestaurantId(2);

        Pedido pedidoFinal = converter.fromDTO(dto2);

        System.out.println(pedidoFinal);

        // services.madePedido(pedidoFinal);

    }
    
}
