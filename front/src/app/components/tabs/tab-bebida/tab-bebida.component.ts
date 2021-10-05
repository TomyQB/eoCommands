import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';

@Component({
  selector: 'app-tab-bebida',
  templateUrl: './tab-bebida.component.html',
  styleUrls: ['./tab-bebida.component.scss']
})
export class TabBebidaComponent implements OnInit {
  @Input() pedidos!: any[]
  @Output() cambioBarra = new EventEmitter<number>();

  // pedidoLocal = sessionStorage .getItem('pedidos')

  constructor(private router: Router, public pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
  }

  drinkView(pedido: any, index: number) {
    sessionStorage .setItem('pedidoInfoPlates', JSON.stringify(pedido))
    sessionStorage .setItem('index', index.toString())
    this.router.navigateByUrl("/restaurantPedidosBebida", {state: {pedido: pedido, i: index}});
  }

}
