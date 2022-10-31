package com.eo.back.services;

import java.util.List;

import com.eo.back.dto.PedidoDTO;
import com.eo.back.dto.WhatsAppDTO;
import com.eo.back.dto.pendingOrders.ChangeTableNumRequest;
import com.eo.back.models.Amount;
import com.eo.back.models.Pedido;
import com.eo.back.repositories.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServices {

    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private RestaurantServices restaurantServices;

    public Pedido getPedidoById(long id) {
        return pedidoRepository.getById(id);
    }

    public WhatsAppDTO getPedidoByRestaurantIdAndTableNum(long id, int tableNum) {
        return createWhatsAppDTO(pedidoRepository.getAllPedidoByRestaurantIdAndTableNum(id, tableNum));
    }

    private WhatsAppDTO createWhatsAppDTO(List<Pedido> pedidos) {
        WhatsAppDTO whatsAppDTO = new WhatsAppDTO();

        whatsAppDTO.setRestaurantName(pedidos.get(0).getRestaurant().getName());
        whatsAppDTO.setTableNum(pedidos.get(0).getTableNum());
        whatsAppDTO.setPhone(pedidos.get(0).getPhoneNumber());

        return whatsAppDTO;
    }
    
    public Pedido savePedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public void deletePedido(PedidoDTO dto) {
        pedidoRepository.deleteAllPedidoByRestaurantIdAndTableNum(restaurantServices.getRestaurantById(dto.getRestaurantId()).getId(), dto.getNumTable());
    }

    public void deletePedidosById(long idPedido) {
        pedidoRepository.deleteById(idPedido);
    }
        
    public void addPedidoToAmount(Pedido pedido) {
        
        for (Amount a : pedido.getAmounts()) {
            a.setOrder(pedido);
        }
    }

    public void setPrintedPedido(long id) {
        Pedido pedido = pedidoRepository.getById(id);
        pedido.setPrinted(true);
        pedidoRepository.save(pedido);
    }

    public void changeTableNum(final ChangeTableNumRequest changeTableNum) {
        if (!pedidoRepository.getAllPedidoByRestaurantIdAndTableNum(changeTableNum.getRestaurantId(), changeTableNum.getNewTableNum()).isEmpty()) {
            throw new NullPointerException();
            //TODO: Lanzar excepción
        }

        List<Pedido> pedidos = pedidoRepository.getAllPedidoByRestaurantIdAndTableNum(changeTableNum.getRestaurantId(), changeTableNum.getOldTableNum());

        for(Pedido pedido : pedidos) {
            pedido.setTableNum(changeTableNum.getNewTableNum());
        }
        pedidoRepository.saveAll(pedidos);
    }

    public boolean checkFirstOrder(final String restaurantId, final String tableNum) {
        return pedidoRepository.getAllPedidoByRestaurantIdAndTableNum(Long.parseLong(restaurantId), Integer.parseInt(tableNum)).isEmpty();
    }

}
