package com.eo.back.services;

import java.util.List;

import com.eo.back.models.Pedido;
import com.eo.back.models.UserRestaurant;
import com.eo.back.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository repository;

    @Autowired
    private PedidoServices services;

    public List<Pedido> loginUser(String email, String password) {

        List<UserRestaurant> user = repository.getUserRestaurantByEmailAndPassword(email, password);

        if(user != null) {
            return services.getAllPedidos(user.get(0));
        }

        return null;
    }

}
