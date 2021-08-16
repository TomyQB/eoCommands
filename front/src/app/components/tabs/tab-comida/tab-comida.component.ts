import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-comida',
  templateUrl: './tab-comida.component.html',
  styleUrls: ['./tab-comida.component.scss']
})
export class TabComidaComponent implements OnInit {
  @Input() pedidos: any

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  plateView(pedido: any) {
    this.router.navigateByUrl("/restaurantPedidosInfo", {state: {pedido: pedido}});
  }

}
