import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPedido() {
    this.router.navigateByUrl("/pedidoInfo");
  }

}
