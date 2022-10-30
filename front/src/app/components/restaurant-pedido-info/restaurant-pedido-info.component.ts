import { Amount } from './../../models/Amount';
import { AmountServicesService } from './../../services/amount-services.service';
import { Component, OnInit } from '@angular/core';

import { PedidoServicesService } from '../../services/pedido-services.service';

@Component({
  selector: 'app-restaurant-pedido-info',
  templateUrl: './restaurant-pedido-info.component.html',
  styleUrls: ['./restaurant-pedido-info.component.scss'],
})
export class RestaurantPedidoInfoComponent implements OnInit {
  pedido: any = JSON.parse(sessionStorage.getItem('pedidoInfoPlates')!);
  index: number = parseInt(sessionStorage.getItem('index')!);

  amount: Amount = {
    amount: 0,
    description: '',
    subTotal: 0,
    extras: [],
    estado: '',
  };

  constructor(
    public pedidoServices: PedidoServicesService,
    private amountService: AmountServicesService
  ) {}

  ngOnInit(): void {
    sessionStorage.setItem('tab', '0');
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('pedidoInfoPlates');
    sessionStorage.removeItem('index');
  }

  marcarHecho(i: number, estado: string) {
    if (estado === 'Pendiente') {
      this.changesEstadoLocal(i, 'Cocinando');
      this.changeEstadoBBDD(i, 'Cocinando');
    } else if (estado === 'Cocinando') {
      this.changesEstadoLocal(i, 'Terminado');
      this.changeEstadoBBDD(i, 'Terminado');
    } else if (estado === 'Terminado') {
      this.changesEstadoLocal(i, 'Servido');
      this.changeEstadoBBDD(i, 'Servido');
      this.addFoodCount();
    } else if (estado === 'Servido') {
      this.changesEstadoLocal(i, 'Pendiente');
      this.changeEstadoBBDD(i, 'Pendiente');
      this.takeOutFoodCount();
    }
  }

  private changeEstadoBBDD(i: number, estado: string) {
    this.amount.estado = estado;
    this.amount.id = this.pedido.amounts[i].id;
    this.amountService.changeEstadoAmount(this.amount).subscribe((data) => {});
  }

  private changesEstadoLocal(i: number, estado: string) {
    this.pedido.amounts[i].estado = estado;
    sessionStorage.setItem('pedidoInfoPlates', JSON.stringify(this.pedido));
  }

  private addFoodCount() {
    this.pedido.hechosFood++;
    this.pedidoServices.changeFoodCount(this.pedido).subscribe((data) => {});
  }

  private takeOutFoodCount() {
    this.pedido.hechosFood--;
    this.pedidoServices.changeFoodCount(this.pedido).subscribe((data) => {});
  }
}
