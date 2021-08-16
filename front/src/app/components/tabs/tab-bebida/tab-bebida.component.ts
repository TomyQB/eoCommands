import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-bebida',
  templateUrl: './tab-bebida.component.html',
  styleUrls: ['./tab-bebida.component.scss']
})
export class TabBebidaComponent implements OnInit {
  @Input() pedidos: any

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  drinkView(pedido: any) {
    this.router.navigateByUrl("/restaurantPedidosBebida", {state: {pedido: pedido}});
  }

}
