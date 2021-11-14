package com.eo.back.services;

import java.util.List;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.WhatsAppDTO;
import com.eo.back.models.Amount;
import com.eo.back.models.Pedido;
import com.eo.back.repositories.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServices {

    @Autowired
    private PedidoRepository repository;
    
    @Autowired
    private RestaurantServices restaurantServices;

    public Pedido getPedidoById(long id) {
        return repository.getById(id);
    }

    public WhatsAppDTO getPedidoByRestaurantIdAndTableNum(long id, int tableNum) {
        return createWhatsAppDTO(repository.getAllPedidoByRestaurantIdAndTableNum(id, tableNum));
    }

    private WhatsAppDTO createWhatsAppDTO(List<Pedido> pedidos) {
        WhatsAppDTO whatsAppDTO = new WhatsAppDTO();

        whatsAppDTO.setRestaurantName(pedidos.get(0).getRestaurant().getName());
        whatsAppDTO.setTableNum(pedidos.get(0).getTableNum());
        whatsAppDTO.setPhone(pedidos.get(0).getPhoneNumber());

        return whatsAppDTO;
    }
    
    public Pedido savePedido(Pedido pedido) {
        return repository.save(pedido);
    }

    public void deletePedido(PedidoDTO dto) {
        repository.deleteAllPedidoByRestaurantIdAndTableNum(restaurantServices.getRestaurantById(dto.getRestaurantId()).getId(), dto.getNumTable());
    }

    public void deletePedidosById(long idPedido) {
        repository.deleteById(idPedido);
    }
        
    public void addPedidoToAmount(Pedido pedido) {
        
        for (Amount a : pedido.getAmounts()) {
            a.setOrder(pedido);
        }
    }

}
