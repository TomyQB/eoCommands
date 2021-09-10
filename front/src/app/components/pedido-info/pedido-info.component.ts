import { PendingOrderService } from './../../services/pending-order.service';
import { ModalPhoneComponent } from './../modal-phone/modal-phone.component';
import { AmountServicesService } from './../../services/amount-services.service';
import { Pedido } from '../../models/Pedido';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmailService } from '../../services/email.service'
import { PedidoServicesService } from '../../services/pedido-services.service'
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HashService } from 'src/app/services/hash.service';
import { TotalObservableService } from 'src/app/services/total-observable.service';

declare var require: any

@Component({
  selector: 'app-pedido-info',
  templateUrl: './pedido-info.component.html',
  styleUrls: ['./pedido-info.component.scss']
})
export class PedidoInfoComponent implements OnInit {

  public showOverlay = false;

  restaurantName: string = localStorage.getItem("name")!;

  dialogConfig: MatDialogConfig = {
    width: '90%',
  }

  pedido: Pedido = {
    numTable: -1,
    email: "",
    restaurantId: parseInt(localStorage.getItem("idRestaurant")!),
    total: history.state.total,
    date: "",
    phoneNumber: ""
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  tableFormControl = new FormControl('', [
    Validators.required,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
  ]);


  constructor(private pedidoService: PedidoServicesService, private pendingOrderService: PendingOrderService, public dialog: MatDialog, private amountServices: AmountServicesService, private router: Router,
    private emailService: EmailService, private hash: HashService, private totalObservableService: TotalObservableService) { }

  ngOnInit(): void {
    this.pedido.amounts = this.amountServices.amounts
  }

  finishPedido() {
    this.showOverlay = true
    this.pedido.date = this.getHour()
    this.sendOrder();

  }

  sendOrder(){
    this.pedidoService.madePedido(this.pedido).subscribe(data => {
      if(data) {
        this.pendingOrderService.madePendingOrder(this.pedido).subscribe(data2 => {
          if(data2 = true) {
            const name = localStorage.getItem("name")
            this.hash.dic = {}
            this.totalObservableService.writeTotal(0)
            this.amountServices.amounts = []
            this.showOverlay = false
            this.router.navigateByUrl("/confirmacion", {state: {nameRest: name}});
          }
        })
      }
    })
  }

  getHour() {
    let dateFormat = require('dateformat');
    let now = new Date()
    return dateFormat(now, "h:MM");
  }

  openDialog() {
    this.pedido.email = this.emailFormControl.value
    this.pedido.numTable = this.tableFormControl.value
    this.pedido.phoneNumber = this.phoneFormControl.value

    if(this.pedido.email && this.pedido.numTable && this.pedido.numTable) {
      this.emailService.sendMessage(this.pedido.email).subscribe(data => {
        const dialogRef = this.dialog.open(ModalPhoneComponent, this.dialogConfig)
        dialogRef.componentInstance.code = data
        dialogRef.afterClosed().subscribe(res => {
          if(res) {
            this.finishPedido()
          }
        })
      })
    } else {
      alert("Rellena todos los campos")
    }
  }

  goCategoriesPage() {
    this.router.navigateByUrl("/menu/" + localStorage.getItem("name"));
  }

}
