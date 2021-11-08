import { WhatsAppDTO } from './../../../models/WhatsAppDTO';
import { WhatsappService } from './../../../services/whatsapp.service';
import { TotalOrdersRecordService } from './../../../services/total-orders-record.service';
import { PedidoServicesService } from './../../../services/pedido-services.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Pedido } from 'src/app/models/Pedido';
import { PendingOrderService } from 'src/app/services/pending-order.service';
import { PendingOrdersRecord } from 'src/app/models/PendingOrdersRecord';
import { CurrencySumbolService } from 'src/app/services/currency-sumbol.service';

@Component({
  selector: 'app-tab-cuenta',
  templateUrl: './tab-cuenta.component.html',
  styleUrls: ['./tab-cuenta.component.scss']
})
export class TabCuentaComponent implements OnInit {
  @Input() pendingOrders: any
  @Output() pedidosOutput = new EventEmitter<String>();

  urlWhatsapp: string = ""
  disableUrl: string = "disable"

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

  whatsAppDTO: WhatsAppDTO = {
    restaurantId: JSON.parse(sessionStorage.getItem('restaurant')!).id,
    tableNum: 0
  }

  total: number = 0;
  tableNum: string = ""

  constructor(public currencySumbolService: CurrencySumbolService, private pendingOrderService: PendingOrderService, private pedidoServices: PedidoServicesService, private totalOrdersRecordService: TotalOrdersRecordService, private whatsappService: WhatsappService) { }

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
  }

  getPendingOrders() {
    this.pendingOrderService.getAllPendingOrder(this.pedidoDelete.restaurantId).subscribe(data => {
      this.pendingOrders = data
      this.calculateTotal()
      sessionStorage.setItem('pendingOrders', JSON.stringify(data))
    })
  }

  getPendingByTable() {
    if(this.tableNum == "") {
      this.whatsappService.message = ""
      this.disableUrl = "disable"
      this.getPendingOrders();
    }
    else {
      this.filtrarPendigOrdersByNumTable(this.tableNum)
      this.disableUrl = ""
    }
  }

  private filtrarPendigOrdersByNumTable(tableNum: string) {
    let i = 0;
    while(i < this.pendingOrders.length) {
      if(this.pendingOrders[i].tableNum != parseInt(tableNum)) this.pendingOrders.splice(i, 1)
      else i++
    }
    this.calculateTotal();
    this.prepareMessage()
  }

  prepareMessage() {
    this.whatsAppDTO.tableNum = parseInt(this.tableNum)
    this.pedidoServices.enviarCuentaWhatsapp(this.whatsAppDTO).subscribe(data => {
      this.whatsappService.singletonMessage(this.pendingOrders, this.total, data)
      this.urlWhatsapp = this.whatsappService.message
      console.log(this.urlWhatsapp)
    })
  }

  sendCuenta() {
    if(this.tableNum != "") {
      // this.urlWhatsapp!.href = ""
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
      this.totalOrdersRecordService.orderRecord = data
    })
  }

}
