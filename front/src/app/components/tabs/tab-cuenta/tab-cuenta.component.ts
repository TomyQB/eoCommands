import { PedidoServicesService } from './../../../services/pedido-services.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Pedido } from 'src/app/models/Pedido';
import { PendingOrderService } from 'src/app/services/pending-order.service';

@Component({
  selector: 'app-tab-cuenta',
  templateUrl: './tab-cuenta.component.html',
  styleUrls: ['./tab-cuenta.component.scss']
})
export class TabCuentaComponent implements OnInit {
  @Input() pendingOrders: any
  @Input() pedidos: any

  @Output() pendingOrdersOutput = new EventEmitter<any>();
  @Output() pedidosOutput = new EventEmitter<any>();

  tableFormControl = new FormControl('', [
    Validators.required,
  ]);

  pedido: Pedido = {
    date: "",
    email: "",
    numTable: 0,
    phoneNumber: "",
    restaurantId: parseInt(localStorage.getItem('userId')!),
    total: 0
  }

  pedidoDelete: Pedido = {
    date: "",
    email: "",
    numTable: 0,
    phoneNumber: "",
    restaurantId: parseInt(localStorage.getItem('userId')!),
    total: 0,
  }

  constructor(private pendingOrderService: PendingOrderService, private pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
  }

  getPendingByTable(event: any) {

    if(event.target.value != "") {
      this.pedido.numTable = event.target.value
      this.pendingOrderService.getPendingOrderByTable(this.pedido).subscribe(data => {
        this.pendingOrders = data
      })

    } else {
      this.pendingOrderService.getAllPendingOrder(this.pedido.restaurantId).subscribe(data => {
        this.pendingOrders = data
      })
    }
  }

  deletePendingOrder() {
    if(this.tableFormControl.value != "") {
      this.pedidoDelete.numTable = this.tableFormControl.value
      this.pedidoServices.deletePedidoObjeto(this.pedidoDelete.numTable)
      this.pendingOrderService.deletePendingOrder(this.pedidoDelete).subscribe(data => {
      })

      this.pedidoServices.deletePedido(this.pedidoDelete).subscribe(data => {
        localStorage.setItem('tab', "2");
        window.location.reload();
      })
    }else {
      alert("Indica que mesa quieres finalizar")
    }
  }

}
