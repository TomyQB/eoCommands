package com.eo.back.controllers;

import java.util.ArrayList;
import java.util.List;

import com.eo.back.convert.PedidoConverter;
import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.Pedido;
import com.eo.back.models.Plate;
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

        /*La lista de PLATES del dto tiene que tener relleno el campo AMOUNT con un objeto AMOUNT*/

        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        
        Plate plate1 = new Plate();

        Amount amount1 = new Amount();
        amount1.setAmount(3);
        amount1.setDescription("Muy muy fria");


        plate1.setAdditionals(null);
        plate1.setAmount(amount1);
        plate1.setDescription("Litro");
        plate1.setName("Estrella de levante");
        plate1.setPrice(3);

        /*-----------------------------------------------------------*/

        Plate plate2 = new Plate();

        Amount amount2 = new Amount();
        amount2.setAmount(2);
        amount2.setDescription("Sin lechuga");

        plate2.setAdditionals(null);
        plate2.setAmount(amount2);
        plate2.setDescription("Rico papi");
        plate2.setName("Costillar");
        plate2.setPrice(20);

        /*-----------------------------------------------------------*/

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

        // List<Pedido> pedidos = services.getAllPedidos(2);

        // System.out.println(pedidos);

    }

    // @GetMapping
    // public ResponseEntity<List<Pedido>> getPedidos(@PathVariable long id) {
    //     List<Pedido> pedidosList = services.getAllPedidos(id);        
    //     return new ResponseEntity<List<Pedido>>(pedidosList, HttpStatus.OK);
    // }

    @PostMapping("/delete")
    public void deletePedidos(@RequestBody int tableNum) {
        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        long id = 1;
        services.deletePedidosByTable(tableNum, id);
    }
    
}
