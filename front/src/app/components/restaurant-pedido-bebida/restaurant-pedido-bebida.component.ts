import { Component, OnInit } from '@angular/core';
import { Amount } from 'src/app/models/Amount';
import { AmountServicesService } from 'src/app/services/amount-services.service';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';

@Component({
  selector: 'app-restaurant-pedido-bebida',
  templateUrl: './restaurant-pedido-bebida.component.html',
  styleUrls: ['./restaurant-pedido-bebida.component.scss']
})
export class RestaurantPedidoBebidaComponent implements OnInit {
  pedido: any = JSON.parse(sessionStorage.getItem('pedidoInfoPlates')!)
  index: number = parseInt(sessionStorage.getItem('index')!)

  amount: Amount = {
    amount: 0,
    description: '',
    subTotal: 0,
    extras: [],
    estado: ''
  }

  constructor(public pedidoServices: PedidoServicesService, private amountService: AmountServicesService) { }

  ngOnInit(): void {
    // this.pedidoServices.pedidoObjeto = JSON.parse(sessionStorage.getItem('pedidos')!)
    sessionStorage.setItem('tab', "1");
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('pedidoInfoPlates')
    sessionStorage.removeItem('index')
  }

  marcarHecho(i: number, estado: string){

    if(estado === "Pendiente") {
      this.changesEstadoLocal(i, "Servido")
      this.changeEstadoBBDD(i, "Servido")
      this.addDrinkCount()

    }else if(estado === "Servido") {
      this.changesEstadoLocal(i, "Pendiente")
      this.changeEstadoBBDD(i, "Pendiente")
      this.takeOutDrinkCount()
    }
  }

  private changeEstadoBBDD(i: number, estado: string) {
    this.amount.estado = estado;
    this.amount.id = this.pedido.amounts[i].id;
    this.amountService.changeEstadoAmount(this.amount).subscribe(data => {});
  }

  private changesEstadoLocal(i: number, estado: string) {
    this.pedido.amounts[i].estado = estado
    sessionStorage.setItem('pedidoInfoPlates', JSON.stringify(this.pedido))
  }

  private addDrinkCount() {
    this.pedido.hechosDrink++
    this.pedidoServices.changeDrinkCount(this.pedido).subscribe(data => {})
  }

  private takeOutDrinkCount() {
    this.pedido.hechosDrink--
    this.pedidoServices.changeDrinkCount(this.pedido).subscribe(data => {})
  }

}
