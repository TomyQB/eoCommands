package com.eo.back.controllers;

import java.util.List;

import com.eo.back.convert.PedidoConverter;
import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Pedido;
import com.eo.back.services.PedidoServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {
    
    @Autowired
    private PedidoServices pedidoServices;

    @Autowired
    private PedidoConverter pedidoConverter;

    @GetMapping("/pedidoInfo")
    public ResponseEntity<Pedido> getPedidoInfo(){

        System.out.println("AAAAAAAAAAAAAAAAA");
        Pedido pedido = new Pedido();
        pedidoServices.madePedido(pedido);
        System.out.println(pedido.toString());

        return new ResponseEntity<Pedido>(pedido, HttpStatus.OK);
    }
    
    @PostMapping("/madePedido")
    public void madePedido(@RequestBody PedidoDTO dto) {
        Pedido pedido = pedidoConverter.fromDTO(dto);
        // pedidoServices.savePedido(pedido);
    }

    @PostMapping("/delete")
    public void deletePedidos(@RequestBody int tableNum) {
        long id = 1;
        pedidoServices.deletePedidosByTable(tableNum, id);
    }
}
