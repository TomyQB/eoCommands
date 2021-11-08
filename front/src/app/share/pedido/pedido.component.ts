
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TotalObservableService } from './../../services/total-observable.service';
import { Subscription } from 'rxjs';
import { CurrencySumbolService } from 'src/app/services/currency-sumbol.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  total: number = 0


  constructor(public currencySumbolService: CurrencySumbolService, private router: Router, private totalObservableService: TotalObservableService) { }

  ngOnInit(): void {
    this.total = this.totalObservableService.getTotal()
  }

  goToPedido() {
    this.router.navigateByUrl("/pedidoInfo", {state: {total: this.total}});
  }

}
