import { PedidoServicesService } from 'src/app/services/pedido-services.service';
import { Amount } from './../models/Amount';
import { Pedido } from './../models/Pedido';
import { RestaurantDTO } from './../models/RestaurantDTO';
import { RestaurantFormMainPage } from './../models/RestaurantFormMainPage';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Login } from '../models/Login';

import  { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  url = environment.Url
  
  greetings: string[] = [];
  disabled = true;
  name: string = "";
  stompClient: any;

  pedido: Pedido = {
    numTable: 1,
    email: "montialvo@gmail.com",
    restaurantId: 1,
    total: 8,
    date: "11:08",
    phoneNumber: "+34616199292",
    estadoFood: "Pendiente",
    estadoDrink: "Pendiente",
    amounts: [
        {
            amount: 1,
            description: "",
            subTotal: 8,
            plate: {
                id: 63,
                name: "Calamares Romana Ración Pequeña (2pers.)",
                description: "\n\n- ALERGIAS:\n- Crustáceos y productos a base de crustáceos",
                price: 8,
                drink: false,
                additionals: [],
                available: true,
                amount: new Amount
            },
            extras: [],
            estado: "Pendiente"
        }
    ],
    foodCount: 1,
    drinkCount: 0
}

  constructor(private pedidoService: PedidoServicesService) { }

  connect() {
    const socket = new SockJS(this.url + 'ws-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);
    });
  }
  
  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }
  
  wsListen() {
    const _this = this;
    this.stompClient.subscribe('/admin', function (hello: any) {
        console.log(JSON.parse(hello.body))
        _this.pedidoService.pedidos.push(JSON.parse(hello.body))
        return JSON.parse(hello.body)
    });
  }

  sendName(pedido: Pedido) {
    this.stompClient.send('/app/save', {}, JSON.stringify(pedido));
  }

  

}
