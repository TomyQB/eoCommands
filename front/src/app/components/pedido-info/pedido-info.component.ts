import { PaymentServiceService } from './../../services/payment-service.service';
import { PendingPayment } from './../../models/PendingPayment';
import { AmountServicesService } from './../../services/amount-services.service';
import { HashService } from './../../services/hash.service';
import { Pedido } from '../../models/Pedido';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component'

import { PedidoServicesService } from '../../services/pedido-services.service'
import { FormControl, Validators } from '@angular/forms';
import { TotalObservableService } from './../../services/total-observable.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

declare var require: any

@Component({
  selector: 'app-pedido-info',
  templateUrl: './pedido-info.component.html',
  styleUrls: ['./pedido-info.component.scss']
})
export class PedidoInfoComponent implements OnInit {

  dialogConfig: MatDialogConfig = {
    width: '90%',
  }

  pedido: Pedido = {
    numTable: -1,
    email: "",
    restaurantName: localStorage.getItem("name")!,
    total: history.state.total,
    date: ""
  }

  pendingPayment: PendingPayment = {
    date: "",
    amount: history.state.total,
    nameUserRestaurant: localStorage.getItem("name")
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  tableFormControl = new FormControl('', [
    Validators.required,
  ]);


  constructor(private pedidoService: PedidoServicesService, private paymentService: PaymentServiceService, public dialog: MatDialog,private router: Router, private hash: HashService, private amountServices: AmountServicesService, private totalObservableService: TotalObservableService) { }

  ngOnInit(): void {
    this.pedido.amounts = this.amountServices.amounts
    console.log(this.pedido.date)
  }

  finishPedido() {
    this.pedido.date = this.getHour()
    console.log(this.pedido.numTable)
    this.sendOrder();

  }

  sendOrder(){
    this.pendingPayment.date = this.getDay()
    this.paymentService.addPendingPayment(this.pendingPayment).subscribe(data => {
      if(data) {
        this.pedidoService.madePedido(this.pedido).subscribe(dataa => {
          if(dataa) {
            const name = localStorage.getItem("name")
            this.hash.dic = {}
            this.totalObservableService.writeTotal(0)
            this.amountServices.amounts = []
            this.router.navigateByUrl("/menu/" + name);
          }
        })
      }
    })
  }

  getHour() {
    let dateFormat = require('dateformat');
    let now = new Date()
    return dateFormat(now, "h:MM:ss");
  }

  getDay() {
    let dateFormat = require('dateformat');
    let now = new Date()
    return dateFormat(now, "dd/mm/yyyy");
  }

  openDialog() {
    this.pedido.email = this.emailFormControl.value
    this.pedido.numTable = this.tableFormControl.value

    if(this.pedido.email && this.pedido.numTable) {
      const dialogRef = this.dialog.open(PaymentComponent, this.dialogConfig)
      dialogRef.componentInstance.price = this.pedido.total
      dialogRef.afterClosed().subscribe(res => {
        if(res) {
          this.finishPedido()
        }
      })
    } else {
      alert("Email y numero de mesa obligatorios");
    }
  }

}
