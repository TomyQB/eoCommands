package com.eo.back.controllers;

import java.util.List;

import com.eo.back.convert.PedidoConverter;
import com.eo.back.dto.PedidoDTO;
import com.eo.back.models.Pedido;
import com.eo.back.services.AmountServices;
import com.eo.back.services.PedidoServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {
    
    @Autowired
    private PedidoServices pedidoServices;
    
    @Autowired
    private AmountServices amountServices;

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
    public ResponseEntity<Boolean> madePedido(@RequestBody PedidoDTO dto) {

        Boolean done = false;

        Pedido pedido = pedidoServices.getPedido();
        pedido = pedidoConverter.fromDTO(dto, pedido);
        if(pedido.getAmounts().size() > 0) {
            pedidoServices.savePedido(pedido);
            pedidoServices.deleteLocalPedido();
            amountServices.deleteLocalAmountList();
            done = true;
        }
        
        return new ResponseEntity<Boolean>(done, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public void deletePedidos(@RequestBody int tableNum) {
        long id = 1;
        pedidoServices.deletePedidosByTable(tableNum, id);
    }
}
