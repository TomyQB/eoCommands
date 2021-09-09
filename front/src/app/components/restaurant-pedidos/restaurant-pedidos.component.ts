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

      this.pedidoServices.getAllPedidos(this.userId).subscribe(dataa => {
      this.pedidos = dataa

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
      })

    } else if(this.pedidoServices.pedidoObjeto.length === 0) {
      this.pedidoServices.pedidoObjeto = JSON.parse(localStorage.getItem('pedidos')!)
      if(this.pedidos.length != this.pedidoServices.pedidoObjeto.length){

        this.pedidos.forEach(pedido => {
          let pedidoDistinto = this.pedidoServices.pedidoObjeto.findIndex(ped => pedido.id == ped.id)
          if(pedidoDistinto < 0) {
            this.pedidoServices.pedidoObjeto.push(pedido)
          }
        });

          localStorage.setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))

        }

    }
  })

    this.pendingOrderService.getAllPendingOrder(this.userId).subscribe(data => {
      this.pendingOrders = data
    })
  }

  eliminarPedidosOutput(event: any) {
    this.pedidos = event
  }

  eliminarPendingOrdersOutput(event: any) {
    this.pendingOrders = event
  }

  crearMenu() {
    this.router.navigateByUrl("/adminCategories");
  }

}
