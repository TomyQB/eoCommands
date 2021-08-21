import { Pedido } from './../../models/Pedido';
import { PendingOrderService } from './../../services/pending-order.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-restaurant-pedidos',
  templateUrl: './restaurant-pedidos.component.html',
  styleUrls: ['./restaurant-pedidos.component.scss']
})
export class RestaurantPedidosComponent implements OnInit {

  public selectedIndex: number = 0;

  userId: number = parseInt(localStorage.getItem('userId')!)

  pedidos!: any[]
  pendingOrders!: any[]

  constructor(private pedidoServices: PedidoServicesService, private router: Router, private pendingOrderService: PendingOrderService) { }

  ngOnInit(): void {

    this.selectedIndex = parseInt(localStorage.getItem('tab')!)
    this.pedidoServices.getAllPedidos(this.userId).subscribe(data => {
    this.pedidos = data
    if(!localStorage.getItem('pedidos')){
      console.log('a');

      this.pedidoServices.getAllPedidos(this.userId).subscribe(dataa => {
      this.pedidos = dataa
      console.log(this.pedidos);

      //esto viene de la bd
      this.pedidos.forEach(hola=>{
        hola.hechos = 0
        hola.estado = 'nada'
        hola.amounts.forEach((element: { servido: boolean; }) => {
          element.servido = false
        });
      })
      this.pedidoServices.pedidoObjeto = dataa
      this.pedidoServices.pedidoObjeto.forEach(hola=>{
        hola.hechos = 0
        hola.estado = 'nada'
      })

      localStorage.setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))

      // console.log(this.pedidos);
      // if(JSON.parse(localStorage.getItem('pedidos')!).length){
      //   if(JSON.parse(localStorage.getItem('pedidos')!).length !== this.pedidos.length){
      //     let pedidosHelp = JSON.parse(localStorage.getItem('pedidos')!)
      //     for(let num = pedidosHelp.length - 1; num < this.pedidos.length; num++){
      //       pedidosHelp.push(this.pedidos[num])
      //     }
      //     console.log('ho');

      //     localStorage.setItem('pedidos', JSON.stringify(pedidosHelp))
      //   } else {
      //     console.log('holas');

      //     localStorage.setItem('pedidos', JSON.stringify(this.pedidos))
      //   }
      // }



      })
    } else if(this.pedidoServices.pedidoObjeto.length === 0) {
      this.pedidoServices.pedidoObjeto = JSON.parse(localStorage.getItem('pedidos')!)
      if(this.pedidos.length != this.pedidoServices.pedidoObjeto.length){
        console.log('h');
        // for(let num = JSON.parse(localStorage.getItem('pedidos')!).length - 1; num < this.pedidos.length; num++){
        //   this.pedidoServices.pedidoObjeto.push(this.pedidos[num])
        // }

        this.pedidos.forEach(pedido => {
          let pedidoDistinto = this.pedidoServices.pedidoObjeto.findIndex(ped => pedido.id == ped.id)
          console.log(pedidoDistinto)
          if(pedidoDistinto < 0) {
            this.pedidoServices.pedidoObjeto.push(pedido)
          }
        });

          localStorage.setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))

        }

    }
  })

console.log(this.pedidoServices.pedidoObjeto);


    this.pendingOrderService.getAllPendingOrder(this.userId).subscribe(data => {
      this.pendingOrders = data
    })
  }


  ajusteCocina(){

  }

  eliminarPedidosOutput(event: any) {
    this.pedidos = event
  }

  eliminarPendingOrdersOutput(event: any) {
    this.pendingOrders = event
  }

}
