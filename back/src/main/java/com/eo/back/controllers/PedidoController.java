package com.eo.back.controllers;

import java.util.List;

import com.eo.back.convert.PedidoConverter;
import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.WhatsAppDTO;
import com.eo.back.models.Pedido;
import com.eo.back.services.PedidoServices;
import com.eo.back.services.RestaurantServices;
import com.eo.back.services.Email.PedidoEmailService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @Operation(summary = "Obtiene los pedidos de un restaurante por su id")
    @PostMapping("/pedido")
    public ResponseEntity<List<Pedido>> getPedidos(@RequestBody long id) {
        List<Pedido> pedidos = restaurantServices.getAllPedidos(id);

        return new ResponseEntity<List<Pedido>>(pedidos, HttpStatus.OK);
    }
    
    @Operation(summary = "Envia la cuenta a un cliente por whatshap")
    @PostMapping("/enviarCuentaWhatsapp")
    public WhatsAppDTO enviarCuentaWhatsapp(@RequestBody WhatsAppDTO dto) {
        return pedidoServices.getPedidoByRestaurantIdAndTableNum(dto.getRestaurantId(), dto.getTableNum());
    }
    
    @Operation(summary = "Realiza un pedido")
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
      
    @Operation(summary = "Cambiar el estado de la comida de un pedido")  
    @PostMapping("/changeEstadoFoodPedido")
    public void changeEstadoFoodPedido(@RequestBody PedidoDTO dto) {
        Pedido pedido = pedidoServices.getPedidoById(dto.getId());
        pedido.setEstadoFood(dto.getEstadoFood());
        pedidoServices.savePedido(pedido);
    }
     
    @Operation(summary = "Cambiar el estado de la bebida de un pedido")       
    @PostMapping("/changeEstadoDrinkPedido")
    public void changeEstadoDrinkPedido(@RequestBody PedidoDTO dto) {
        Pedido pedido = pedidoServices.getPedidoById(dto.getId());
        pedido.setEstadoDrink(dto.getEstadoDrink());
        pedidoServices.savePedido(pedido);
    }
     
    @Operation(summary = "Cambiar el de la comida servida de un pedido")           
    @PostMapping("/changeFoodCount")
    public void changeFoodCount(@RequestBody PedidoDTO dto) {
        Pedido pedido = pedidoServices.getPedidoById(dto.getId());
        pedido.setHechosFood(dto.getHechosFood());
        pedidoServices.savePedido(pedido);
    }
    
    @Operation(summary = "Cambiar el de la bebida servida de un pedido")                
    @PostMapping("/changeDrinkCount")
    public void changeDrinkCount(@RequestBody PedidoDTO dto) {
        Pedido pedido = pedidoServices.getPedidoById(dto.getId());
        pedido.setHechosDrink(dto.getHechosDrink());
        pedidoServices.savePedido(pedido);
    }

    @Operation(summary = "Elimina un pedido")
    @PostMapping("/deletePedido")
    public void deletePedidos(@RequestBody PedidoDTO dto) {
        pedidoServices.deletePedido(dto);
    }

    @Operation(summary = "Marca un pedido como impreso")
    @PutMapping("/pedidoPrinted")
    public void pedidoPrinted(@RequestBody long id) {
        pedidoServices.setPrintedPedido(id);
    }

    @Operation(summary = "Comprueba si ya se ha realizado algun pedido desde esa mesa")
    @GetMapping("/checkFirstOrder/{restaurantId}/{tableNum}")
    public boolean checkFirstOrder(@PathVariable String restaurantId, @PathVariable String tableNum) {
        return pedidoServices.checkFirstOrder(restaurantId, tableNum);
    }
}
