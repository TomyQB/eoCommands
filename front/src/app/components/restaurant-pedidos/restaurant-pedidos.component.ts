import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-pedidos',
  templateUrl: './restaurant-pedidos.component.html',
  styleUrls: ['./restaurant-pedidos.component.scss']
})
export class RestaurantPedidosComponent implements OnInit {

  pedidos: any = history.state.pedidos

  constructor() { }

  ngOnInit(): void {
    console.log(this.pedidos)
  }

}
