import { Restaurant } from './../../models/Restaurant';
import { AmountServicesService } from './../../services/amount-services.service';
import { PendingOrderService } from './../../services/pending-order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-restaurant-pedidos',
  templateUrl: './restaurant-pedidos.component.html',
  styleUrls: ['./restaurant-pedidos.component.scss']
})
export class RestaurantPedidosComponent implements OnInit {

  public selectedIndex: number = 0;

  restaurant: Restaurant = JSON.parse(sessionStorage.getItem('restaurant')!)
  pedidos!: any[]
  pendingOrders!: any[]
  isDrinkZone: boolean = true;

  // contadorPedidos: number = parseInt(sessionStorage.getItem('contadorPedidos')!)

  constructor(private pedidoServices: PedidoServicesService, private router: Router, private pendingOrderService: PendingOrderService) { }

  ngOnInit(): void {
    console.log(this.restaurant)
    this.selectedIndex = parseInt(sessionStorage.getItem('tab')!)
    this.getPedidos();

    this.pendingOrderService.getAllPendingOrder(this.restaurant.id).subscribe(data => {
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
    this.pedidoServices.getAllPedidos(this.restaurant.id).subscribe(data => {
      this.pedidos = data
      console.log(this.pedidos)
    })
  }

  // getPedidos() {
  //   this.pedidoServices.getAllPedidos(this.userId).subscribe(data => {
  //     this.pedidos = data
  //     console.log(this.pedidos)

  //     if(!sessionStorage.getItem('pedidos')){

  //       this.pedidoServices.getAllPedidos(this.userId).subscribe(dataa => {
  //       this.pedidos = dataa

  //       //esto viene de la bd
  //       this.pedidos.forEach(hola=>{
  //         hola.hechos = 0
  //         hola.estado = 'nada'
  //         hola.amounts.forEach((element: { servido: boolean; }) => {
  //           element.servido = false
  //         });
  //       })
  //       this.pedidoServices.pedidoObjeto = dataa
  //       this.pedidoServices.pedidoObjeto.forEach(hola=>{
  //         hola.hechos = 0
  //         hola.estado = 'nada'
  //       })

  //       sessionStorage.setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))
  //       })

  //     } else if(this.pedidoServices.pedidoObjeto.length === 0) {
  //       this.pedidoServices.pedidoObjeto = JSON.parse(sessionStorage.getItem('pedidos')!)
  //       if(this.pedidos.length != this.pedidoServices.pedidoObjeto.length){

  //         this.pedidos.forEach(pedido => {
  //           let pedidoDistinto = this.pedidoServices.pedidoObjeto.findIndex(ped => pedido.id == ped.id)
  //           if(pedidoDistinto < 0) {
  //             this.pedidoServices.pedidoObjeto.push(pedido)
  //           }
  //         });

  //           sessionStorage.setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))

  //         }

  //     }
  //   })
  // }

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
    sessionStorage.clear();
    this.router.navigateByUrl('login')
  }

}
