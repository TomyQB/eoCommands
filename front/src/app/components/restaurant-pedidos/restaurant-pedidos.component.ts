import { RestaurantStoreService } from './../../store/admin/restaurant-store.service';
import { AmountServicesService } from './../../services/amount-services.service';
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

  userId: number = parseInt(sessionStorage .getItem('userId')!)

  pedidos!: any[]
  pendingOrders!: any[]

  contadorPedidos: number = parseInt(sessionStorage .getItem('contadorPedidos')!)

  constructor(private restaurantStoreService: RestaurantStoreService, private pedidoServices: PedidoServicesService, private router: Router, private pendingOrderService: PendingOrderService, private amountService: AmountServicesService) { }

  ngOnInit(): void {

    this.restaurantStoreService.restaurant = JSON.parse(sessionStorage.getItem('restaurant')!)
    console.log(this.restaurantStoreService.restaurant)

    this.selectedIndex = parseInt(sessionStorage .getItem('tab')!)

    this.getPedidos();

    this.pendingOrderService.getAllPendingOrder(this.userId).subscribe(data => {
      this.pendingOrders = data
    })

    setInterval(() => {
      this.getPedidos();
      }, 10000);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  getPedidos() {
    this.pedidoServices.getAllPedidos(this.userId).subscribe(data => {
      this.pedidos = data
      console.log(this.pedidos)

      if(!sessionStorage .getItem('pedidos')){

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

        sessionStorage .setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))
        })

      } else if(this.pedidoServices.pedidoObjeto.length === 0) {
        this.pedidoServices.pedidoObjeto = JSON.parse(sessionStorage .getItem('pedidos')!)
        if(this.pedidos.length != this.pedidoServices.pedidoObjeto.length){

          this.pedidos.forEach(pedido => {
            let pedidoDistinto = this.pedidoServices.pedidoObjeto.findIndex(ped => pedido.id == ped.id)
            if(pedidoDistinto < 0) {
              this.pedidoServices.pedidoObjeto.push(pedido)
            }
          });

            sessionStorage .setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))

          }

      }
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
    // setTimeout(function reload() {
    //   window.location.reload()
    // }, 20)
  }

  logOut() {
    sessionStorage .clear();
    this.router.navigateByUrl('login')
  }

}
