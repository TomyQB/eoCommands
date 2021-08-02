import { PedidoServicesService } from './../../services/pedido-services.service';
import { HashService } from './../../services/hash.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TotalObservableService } from './../../services/total-observable.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  total: number = 0

  subcriptor!: Subscription;

  constructor(private router: Router, private hashService: HashService, private pedidoServices: PedidoServicesService, private totalObservableService: TotalObservableService) { }

  ngOnInit(): void {
    this.subcriptor = this.totalObservableService.getTotal().subscribe(message => { this.total = message; });
  }

  goToPedido() {
    this.router.navigateByUrl("/pedidoInfo", {state: {total: this.total}});
  }

}
