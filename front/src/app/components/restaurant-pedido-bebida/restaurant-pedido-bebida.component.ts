import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-pedido-bebida',
  templateUrl: './restaurant-pedido-bebida.component.html',
  styleUrls: ['./restaurant-pedido-bebida.component.scss']
})
export class RestaurantPedidoBebidaComponent implements OnInit {

  pedido: any = history.state.pedido

  constructor() { }

  ngOnInit(): void {
    console.log(this.pedido)
  }

}
