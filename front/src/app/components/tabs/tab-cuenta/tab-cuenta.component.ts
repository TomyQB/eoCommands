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

  @Output() pedidosOutput = new EventEmitter<String>();

  tableFormControl = new FormControl('', [
    Validators.required,
  ]);

  pedidoDelete: Pedido = {
    date: "",
    email: "",
    numTable: 0,
    phoneNumber: "",
    restaurantId: JSON.parse(sessionStorage.getItem('restaurant')!).id,
    total: 0,
  }

  tableNum: string = ""

  constructor(private pendingOrderService: PendingOrderService, private pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
    this.getPendingOrders();

    setInterval(() => {
      if(this.tableNum == "") this.getPendingOrders();
      else this.filtrarPendigOrdersByNumTable(this.tableNum);
      }, 10000);
  }

  getPendingOrders() {
    this.pendingOrderService.getAllPendingOrder(JSON.parse(sessionStorage.getItem('restaurant')!).id).subscribe(data => {
      this.pendingOrders = data
      sessionStorage.setItem('pendingOrders', JSON.stringify(data))
    })
  }

  getPendingByTable() {
    if(this.tableNum == "") this.getPendingOrders();
    else this.filtrarPendigOrdersByNumTable(this.tableNum)
  }

  private filtrarPendigOrdersByNumTable(tableNum: string) {
    let i = 0;
    while(i < this.pendingOrders.length) {
      if(this.pendingOrders[i].tableNum != parseInt(tableNum)) this.pendingOrders.splice(i, 1)
      else i++
    }
  }

  // deletePendingOrder() {
  //   if(this.tableFormControl.value != "") {
  //     this.pedidoDelete.numTable = this.tableFormControl.value
  //     this.pedidoServices.deletePedidoObjeto(this.pedidoDelete.numTable)
  //     this.pendingOrderService.deletePendingOrder(this.pedidoDelete).subscribe(data => {
  //       sessionStorage.setItem('tab', "2");
  //       var cont = parseInt(sessionStorage.getItem('contadorPedidos')!)
  //       cont++
  //       sessionStorage.setItem('contadorPedidos', cont.toString())
  //       window.location.reload();
  //     })
  //   }else {
  //     alert("Indica que mesa quieres finalizar")
  //   }
  // }

  sendCuenta() {
    if(this.tableNum != "") {
    } else alert("Selecciona una mesa")
  }

  deleteCuenta() {
    if(this.tableNum != "") {
      this.pedidosOutput.emit("fin")
      this.pedidoDelete.numTable = parseInt(this.tableNum)
      this.deletePedido();
      this.deletePendingOrders();
    } else alert("Selecciona una mesa")
  }

  private deletePedido() {
    this.pedidoServices.deletePedido(this.pedidoDelete).subscribe(data => {
    })
  }

  private deletePendingOrders() {
    this.pendingOrderService.deletePendingOrder(this.pedidoDelete).subscribe(data => {
      this.tableNum = "";
      this.getPendingByTable()
      this.pedidosOutput.emit()
    })
  }

  saveOrdersRecord() {

  }

}
