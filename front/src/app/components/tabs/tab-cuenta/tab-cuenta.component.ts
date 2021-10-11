import { TotalOrdersRecordService } from './../../../services/total-orders-record.service';
import { PedidoServicesService } from './../../../services/pedido-services.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Pedido } from 'src/app/models/Pedido';
import { PendingOrderService } from 'src/app/services/pending-order.service';
import { PendingOrdersRecord } from 'src/app/models/PendingOrdersRecord';

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

  total: number = 0;
  tableNum: string = ""

  constructor(private pendingOrderService: PendingOrderService, private pedidoServices: PedidoServicesService, private totalOrdersRecordService: TotalOrdersRecordService) { }

  ngOnInit(): void {
    this.getPendingOrders();

    setInterval(() => {
      if(this.tableNum == "") this.getPendingOrders();
      else this.filtrarPendigOrdersByNumTable(this.tableNum);
      }, 10000);
  }

  calculateTotal() {
    this.total = 0;
    for(let i = 0; i < this.pendingOrders.length; i++) {
      let amount = this.pendingOrders[i].amount
      let price = (this.pendingOrders[i].additional) ? this.pendingOrders[i].additional.price : this.pendingOrders[i].plate.price
      this.total += amount * price;
      this.total = Math.round(this.total * 100) / 100;
    }
    console.log(this.total)
  }

  getPendingOrders() {
    this.pendingOrderService.getAllPendingOrder(this.pedidoDelete.restaurantId).subscribe(data => {
      this.pendingOrders = data
      this.calculateTotal()
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
    this.calculateTotal();
  }

  sendCuenta() {
    if(this.tableNum != "") {
    } else alert("Selecciona una mesa")
  }

  deleteCuenta() {
    if(this.tableNum != "") {
      this.pedidosOutput.emit("fin")
      this.pedidoDelete.numTable = parseInt(this.tableNum)
      this.updateTotalOrdersRecord()
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
      let pendingOrder: PendingOrdersRecord[] = data
      this.saveOrdersRecord(pendingOrder)
    })
  }

  private saveOrdersRecord(pendingOrders: PendingOrdersRecord[]) {
    pendingOrders.forEach(pendingOrder => {
      if(pendingOrder.additional != null) this.pendingOrderService.madePendingOrderAdditionalRecord(pendingOrder).subscribe(data => {})
      if(pendingOrder.plate != null) this.pendingOrderService.madePendingOrderPlateRecord(pendingOrder).subscribe(data => {})
    });
  }

  private updateTotalOrdersRecord() {
    this.totalOrdersRecordService.updateTotalOrdersRecord(this.pedidoDelete.restaurantId!).subscribe(data => {
      console.log(data)
      this.totalOrdersRecordService.orderRecord = data
    })
  }

}
