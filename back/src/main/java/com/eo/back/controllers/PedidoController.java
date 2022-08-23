package com.eo.back.controllers;

import java.util.List;

import com.eo.back.convert.PedidoConverter;
import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.WhatsAppDTO;
import com.eo.back.models.Pedido;
import com.eo.back.services.PedidoServices;
import com.eo.back.services.RestaurantServices;
import com.eo.back.services.Email.PedidoEmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PedidoController {
    
    @Autowired
    private PedidoServices pedidoServices;
    
    @Autowired
    private RestaurantServices restaurantServices;

    @Autowired
    private PedidoConverter pedidoConverter;
    
    @Autowired
    private PedidoEmailService emailService;

    @PostMapping("/pedido")
    public ResponseEntity<List<Pedido>> getPedidos(@RequestBody long id) {
        List<Pedido> pedidos = restaurantServices.getAllPedidos(id);

        return new ResponseEntity<List<Pedido>>(pedidos, HttpStatus.OK);
    }
    
    @PostMapping("/enviarCuentaWhatsapp")
    public WhatsAppDTO enviarCuentaWhatsapp(@RequestBody WhatsAppDTO dto) {
        return pedidoServices.getPedidoByRestaurantIdAndTableNum(dto.getRestaurantId(), dto.getTableNum());
    }
    
    @PostMapping("/madePedido")
    public ResponseEntity<Boolean> madePedido(@RequestBody PedidoDTO dto) {

        Boolean done = false;

        Pedido pedido = pedidoConverter.fromDTO(dto);
        
        if(pedido.getAmounts().size() > 0) {
            pedidoServices.addPedidoToAmount(pedido);
            Pedido pedidoDB = pedidoServices.savePedido(pedido);
            emailService.sendEmail(pedidoDB);
            done = true;
        }
        
        return new ResponseEntity<Boolean>(done, HttpStatus.OK);
    }
        
    @PostMapping("/changeEstadoFoodPedido")
    public void changeEstadoFoodPedido(@RequestBody PedidoDTO dto) {
        Pedido pedido = pedidoServices.getPedidoById(dto.getId());
        pedido.setEstadoFood(dto.getEstadoFood());
        pedidoServices.savePedido(pedido);
    }
            
    @PostMapping("/changeEstadoDrinkPedido")
    public void changeEstadoDrinkPedido(@RequestBody PedidoDTO dto) {
        Pedido pedido = pedidoServices.getPedidoById(dto.getId());
        pedido.setEstadoDrink(dto.getEstadoDrink());
        pedidoServices.savePedido(pedido);
    }
                
    @PostMapping("/changeFoodCount")
    public void changeFoodCount(@RequestBody PedidoDTO dto) {
        Pedido pedido = pedidoServices.getPedidoById(dto.getId());
        pedido.setHechosFood(dto.getHechosFood());
        pedidoServices.savePedido(pedido);
    }
                    
    @PostMapping("/changeDrinkCount")
    public void changeDrinkCount(@RequestBody PedidoDTO dto) {
        Pedido pedido = pedidoServices.getPedidoById(dto.getId());
        pedido.setHechosDrink(dto.getHechosDrink());
        pedidoServices.savePedido(pedido);
    }

    @PostMapping("/deletePedido")
    public void deletePedidos(@RequestBody PedidoDTO dto) {
        pedidoServices.deletePedido(dto);
    }

    @PutMapping("/pedidoPrinted")
    public void pedidoPrinted(@RequestBody long id) {
        pedidoServices.setPrintedPedido(id);
    }
}
