import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';

@Component({
  selector: 'app-tab-comida',
  templateUrl: './tab-comida.component.html',
  styleUrls: ['./tab-comida.component.scss']
})
export class TabComidaComponent implements OnInit {
  @Input() pedidos!: any[]
  @Output() cambioCocina = new EventEmitter<number>();

  pedidoLocal = sessionStorage .getItem('pedidos')

  constructor(private router: Router, public pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
  }

  plateView(pedido: any, index: number) {
    sessionStorage .setItem('pedidoInfoPlates', JSON.stringify(pedido))
    sessionStorage .setItem('index', index.toString())
    this.router.navigateByUrl("/restaurantPedidosInfo", {state: {pedido: pedido, i: index}, });
  }

}
