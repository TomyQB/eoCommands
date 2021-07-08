package com.eo.back.services;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.eo.back.models.Amount;
import com.eo.back.models.Pedido;
import com.eo.back.models.UserRestaurant;
import com.eo.back.repositories.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServices {

    @Autowired
    private PedidoRepository repository;

    @Autowired
    private AmountServices amountServices;

    private Pedido pedido;

    public Pedido getPedido() {
        return this.pedido;
    }
    
    public void savePedido(Pedido pedido) {
        repository.save(pedido);
    }

    public List<Pedido> getAllPedidos(UserRestaurant user) {
        return user.getRestaurant().getOrders();
    }

    public void madePedido(Pedido pedido) {
        pedido.setDate(this.calculateDate());
        pedido.setAmounts(amountServices.getAmountList());
        addPedidoToAmount(pedido);
    }

    public void deletePedidosByTable(int tableNum, long id) {
        // List<Pedido> pedidos = repository.getPedidoByTableNumAndRestaurantId(tableNum, id);

        // for (Pedido p : pedidos) {
        //     repository.delete(p);
        // }
    }

    private String calculateDate() {
        SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
        String dateString = date.format(new Date());

        return dateString;
    }

    private void addPedidoToAmount(Pedido pedido) {
        
        for (Amount a : pedido.getAmounts()) {
            a.setOrder(pedido);
        }
    }
    
}
